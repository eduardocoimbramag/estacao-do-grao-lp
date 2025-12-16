const SHEET_ID = '1eafSNQA5oKcE2-5p9XW-0Mmy7qXq60AOi5HMtmJAU2U';
const SHEET_NAME = 'pag1';
const IP_LOG_SHEET = 'ControleIPs';
const EMAIL_DESTINO = 'contato@estacaodograo.com.br';
const LIMITE_HORAS = 24;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (!data.name || !data.email) {
      return criarResposta({
        success: false,
        error: 'Nome e e-mail são obrigatórios'
      });
    }
    
    const ip = obterIP(e, data);
    Logger.log(`IP detectado: ${ip}`);
    
    const bloqueado = verificarBloqueioIP(ip);
    
    if (bloqueado) {
      Logger.log(`IP bloqueado: ${ip}`);
      return criarResposta({
        success: false,
        error: 'RATE_LIMIT',
        message: 'Você já enviou uma solicitação recentemente. Aguarde 24 horas para enviar novamente.'
      });
    }
    
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return criarResposta({
        success: false,
        error: 'Aba "pag1" não encontrada'
      });
    }
    
    let socialOuCorporativo = '';
    if (data.eventType === 'pessoal') {
      socialOuCorporativo = 'Social';
    } else if (data.eventType === 'empresarial') {
      socialOuCorporativo = 'Corporativo';
    }
    
    const dataHora = data.timestamp 
      ? Utilities.formatDate(new Date(data.timestamp), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss')
      : Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
    
    const rowData = [
      data.name || '',
      data.email || '',
      data.phone || '',
      socialOuCorporativo,
      data.eventTypeName || '',
      data.eventDescription || '',
      dataHora,
      ip,
      ''
    ];
    
    sheet.appendRow(rowData);
    Logger.log(`Dados salvos com sucesso para IP: ${ip}`);
    
    registrarIP(ip);
    
    if (EMAIL_DESTINO) {
      try {
        const subject = 'Nova solicitação de orçamento - Estação do Grão';
        const body = `Nova solicitação de orçamento recebida:

Nome: ${data.name}
E-mail: ${data.email}
Telefone: ${data.phone || 'Não informado'}
Tipo: ${socialOuCorporativo || 'Não informado'}
Tipo de Evento: ${data.eventTypeName || 'Não informado'}
Descrição: ${data.eventDescription || 'Não informado'}

IP do remetente: ${ip}
Data/Hora: ${dataHora}

Os dados foram salvos na planilha.

---
Este é um e-mail automático da Estação do Grão.`;
        
        MailApp.sendEmail(EMAIL_DESTINO, subject, body);
        Logger.log('E-mail enviado com sucesso');
      } catch (emailError) {
        Logger.log(`Erro ao enviar e-mail: ${emailError}`);
      }
    }
    
    return criarResposta({
      success: true,
      message: 'Dados salvos com sucesso'
    });
      
  } catch (error) {
    Logger.log(`Erro geral: ${error}`);
    return criarResposta({
      success: false,
      error: error.toString()
    });
  }
}

function obterIP(e, data) {
  try {
    if (data && data.userIP && data.userIP !== 'IP_UNAVAILABLE') {
      Logger.log(`IP recebido do frontend: ${data.userIP}`);
      return data.userIP;
    }
    
    const ip = e.parameter.userip || 
               e.parameter['X-Forwarded-For'] || 
               e.parameter['X-Real-IP'] ||
               e.parameter['CF-Connecting-IP'] ||
               'IP não disponível';
    
    if (ip !== 'IP não disponível' && ip.includes(',')) {
      return ip.split(',')[0].trim();
    }
    
    return ip;
  } catch (error) {
    Logger.log(`Erro ao obter IP: ${error}`);
    return 'IP não disponível';
  }
}

function verificarBloqueioIP(ip) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let ipSheet = ss.getSheetByName(IP_LOG_SHEET);
    
    if (!ipSheet) {
      Logger.log('Criando aba ControleIPs...');
      ipSheet = ss.insertSheet(IP_LOG_SHEET);
      ipSheet.appendRow(['IP', 'Timestamp', 'Data/Hora Formatada']);
      
      const headerRange = ipSheet.getRange(1, 1, 1, 3);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f3f3f3');
      
      return false;
    }
    
    const dados = ipSheet.getDataRange().getValues();
    
    if (dados.length <= 1) {
      return false;
    }
    
    const agora = new Date().getTime();
    const limiteMs = LIMITE_HORAS * 60 * 60 * 1000;
    
    for (let i = dados.length - 1; i >= 1; i--) {
      const ipRegistrado = dados[i][0];
      const timestampRegistrado = dados[i][1];
      
      if (ipRegistrado === ip) {
        const timestampDate = new Date(timestampRegistrado).getTime();
        const diferencaMs = agora - timestampDate;
        
        if (diferencaMs < limiteMs) {
          const horasRestantes = Math.ceil((limiteMs - diferencaMs) / (60 * 60 * 1000));
          Logger.log(`IP ${ip} bloqueado. Horas restantes: ${horasRestantes}h`);
          return true;
        }
        
        Logger.log(`IP ${ip} encontrado mas bloqueio expirado`);
        break;
      }
    }
    
    return false;
    
  } catch (error) {
    Logger.log(`Erro ao verificar bloqueio de IP: ${error}`);
    return false;
  }
}

function registrarIP(ip) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let ipSheet = ss.getSheetByName(IP_LOG_SHEET);
    
    if (!ipSheet) {
      ipSheet = ss.insertSheet(IP_LOG_SHEET);
      ipSheet.appendRow(['IP', 'Timestamp', 'Data/Hora Formatada']);
      
      const headerRange = ipSheet.getRange(1, 1, 1, 3);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f3f3f3');
    }
    
    const agora = new Date();
    const timestampMs = agora.getTime();
    const dataHoraFormatada = Utilities.formatDate(
      agora, 
      Session.getScriptTimeZone(), 
      'dd/MM/yyyy HH:mm:ss'
    );
    
    ipSheet.appendRow([ip, timestampMs, dataHoraFormatada]);
    Logger.log(`IP registrado: ${ip} em ${dataHoraFormatada}`);
    
  } catch (error) {
    Logger.log(`Erro ao registrar IP: ${error}`);
  }
}

function criarResposta(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function limparRegistrosAntigos() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const ipSheet = ss.getSheetByName(IP_LOG_SHEET);
    
    if (!ipSheet) {
      Logger.log('Aba ControleIPs não encontrada');
      return;
    }
    
    const dados = ipSheet.getDataRange().getValues();
    const agora = new Date().getTime();
    const trintaDiasMs = 30 * 24 * 60 * 60 * 1000;
    let removidos = 0;
    
    for (let i = dados.length - 1; i >= 1; i--) {
      const timestamp = dados[i][1];
      
      if (timestamp) {
        const timestampDate = new Date(timestamp).getTime();
        const diferenca = agora - timestampDate;
        
        if (diferenca > trintaDiasMs) {
          ipSheet.deleteRow(i + 1);
          removidos++;
        }
      }
    }
    
    Logger.log(`Limpeza concluída. ${removidos} registros removidos.`);
    
  } catch (error) {
    Logger.log(`Erro na limpeza: ${error}`);
  }
}

function testarSistema() {
  const ipTeste = '192.168.1.100';
  
  Logger.log('=== TESTE DO SISTEMA ===');
  Logger.log(`IP de teste: ${ipTeste}`);
  
  const bloqueado1 = verificarBloqueioIP(ipTeste);
  Logger.log(`1. IP bloqueado? ${bloqueado1} (esperado: false)`);
  
  registrarIP(ipTeste);
  Logger.log('2. IP registrado');
  
  const bloqueado2 = verificarBloqueioIP(ipTeste);
  Logger.log(`3. IP bloqueado após registro? ${bloqueado2} (esperado: true)`);
  
  Logger.log('=== TESTE CONCLUÍDO ===');
}