import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import { InjectHttpInterceptor } from './agent.js';
import { Server } from 'http';

//mock do jest no evento original do http
//quando substituir o modulo http pelo InjectHttpInterceptor
//vai sujar a instancia global

//copia do http original
//para saber que uma requisição chegou o evento do node guarda é o request
//dados request e response

//  response alterar o header
// caso não seja interceptado o setheader não deve ser chamado

const originalHttp = jest.createMockFromModule('http');

describe('HTTP Interceptor Agent', () => {
  const eventName = 'request';
  const request = null;
  beforeEach(() => jest.clearAllMocks())

  test('should not change header', () => {
    const response = {
      setHeader: jest.fn().mockReturnThis()
    }

    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).not.toHaveBeenCalled()
  });
  test('should activate header interceptor', () => {
    InjectHttpInterceptor()

    const response = {
      setHeader: jest.fn().mockReturnThis()
    }

    const serverInstance = new Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'Bruna')
  });
});
