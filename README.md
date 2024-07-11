
# Camera Capture Tool

Este projeto cria uma aplicação web usando Flask para capturar automaticamente uma foto e gravar um vídeo ao acessar um link e completar um quiz. A aplicação foi desenvolvida para fins educacionais e deve ser usada em um ambiente controlado com consentimento.

## Estrutura do Projeto

```
camera-capture-tool/
├── templates/
│   └── index.html
├── static/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── captures/
├── videos/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
```

- `templates/index.html`: Template HTML para a página de captura e quiz.
- `static/css/styles.css`: Arquivo CSS para estilização da página.
- `static/js/script.js`: Arquivo JavaScript para manipulação da câmera e envio de dados.
- `captures/`: Pasta onde as imagens capturadas são salvas.
- `videos/`: Pasta onde os vídeos gravados são salvos.
- `app.py`: Arquivo principal do Flask contendo o backend da aplicação.
- `requirements.txt`: Lista de dependências do projeto.
- `README.md`: Documentação do projeto.
- `.gitignore`: Arquivos e pastas ignorados pelo Git.

## Dependências

- Flask
- Flask-CORS
- OpenCV-Python

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/camera-capture-tool.git
   cd camera-capture-tool
   ```

2. Crie um ambiente virtual e instale as dependências:

   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows, use `venv\Scriptsctivate`
   pip install -r requirements.txt
   ```

## Execução

1. Inicie o servidor Flask:

   ```bash
   python app.py
   ```

2. Acesse a aplicação no navegador:

   ```text
   http://127.0.0.1:5000/
   ```

## Uso

1. Acesse o link gerado pelo servidor Flask no navegador do seu celular. Certifique-se de que o computador e o celular estão na mesma rede.
2. Complete o quiz. A câmera será ativada automaticamente e as imagens serão capturadas a cada 1 segundo. A gravação de vídeo será iniciada automaticamente e enviada ao servidor ao finalizar o quiz.

## Considerações de Privacidade

- Este projeto deve ser usado em um ambiente controlado e com consentimento explícito.
- Certifique-se de que o uso de captura de vídeo e imagens está em conformidade com as leis e regulamentos de privacidade.

## Estrutura de Arquivos

### `app.py`

O arquivo principal do Flask contendo rotas para a captura de imagens e gravação de vídeos.

### `templates/index.html`

O template HTML principal que contém o quiz e os elementos de vídeo.

### `static/css/styles.css`

Arquivo CSS para estilização da página, incluindo layout, cores e fontes.

### `static/js/script.js`

Arquivo JavaScript responsável por acessar a câmera, capturar imagens, iniciar e parar a gravação de vídeos, e enviar esses dados para o servidor.

### Capturas e Vídeos

As imagens capturadas serão salvas na pasta `captures/` e os vídeos gravados serão salvos na pasta `videos/`.
