# pit-cnpj-fe

Front-End de API para consultar dados de CNPJ (Cadastro Nacional da Pessoa Jurídica) diretamente da Receita Federal.

Essa API é resultado do PIT Atividade da disciplina Projeto Integrador Transdisciplinar em Engenharia de Software II do curso de Bacharelado em Engenharia de Software da Universidade Cruzeiro do Sul.

Um demonstração com implementação dos serviços dessa API está disponível [aqui](https://pit-cnpj.venith.com.br)

## Dados do aluno
- **Nome**: VENILSON PEREIRA DE OLIVEIRA
- **RGM**: 31237444
- **Semestre**: 2024.2

## Funcionalidades

1. **Consultar CNPJ**:
   - A API permite acessar informações públicas sobre uma empresa fornecendo seu número de CNPJ.

2. **Integração com a Receita Federal do Brasil**:
   - As consultas são realizadas diretamente no site oficial da Receita Federal, garantindo dados confiáveis e atualizados.

3. **Retorno do Captcha para o Usuário**:
   - A API retorna o captcha exigido pela Receita Federal para que o usuário o resolva e prossiga com a consulta.

4. **Restrição de Acesso por API Key**:
   - O acesso à API é restrito e controlado por meio de chaves de autenticação (**API Keys**).
   - **Como funciona**:
     - O cliente deve enviar a chave no cabeçalho da requisição:
       ```http
       Authorization: Bearer <x-api-key>
       ```
     - A API valida a chave antes de processar qualquer operação.

5. **Suporte a CORS**:
   - A API possui configurações de **Cross-Origin Resource Sharing (CORS)**, controlando o acesso entre domínios.
   - **Configuração**:
     - Apenas domínios autorizados podem consumir os endpoints da API, reforçando a segurança contra acessos não autorizados.

## Servidor de desenvolvimento

Execute `ng serve` para iniciar o servidor de desenvolvimento. Acesse `http://localhost:4200/`. A aplicação será recarregada automaticamente sempre que você modificar algum arquivo de origem.

## Build

Execute `ng build` para gerar o build do projeto. Os arquivos de build serão armazenados no diretório `dist/`.

## Mais ajuda

Para obter mais ajuda sobre o Angular CLI, utilize `ng help` ou confira a [Visão Geral e Referência de Comandos do Angular CLI](https://angular.io/cli).

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

A Licença MIT permite que qualquer pessoa faça praticamente qualquer coisa com o código, incluindo copiá-lo, modificá-lo, distribuí-lo e usá-lo em projetos privados, desde que forneçam o aviso de copyright e a renúncia de responsabilidade da licença em todas as cópias ou partes substanciais do software.

Para mais detalhes sobre a Licença MIT, consulte o [site oficial](https://opensource.org/licenses/MIT).



