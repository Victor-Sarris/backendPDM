Aqui está o conteúdo completo formatado para o seu arquivo `README.md`, incluindo as instruções originais e o novo guia do Ngrok com o link solicitado.

Você pode copiar e colar este conteúdo diretamente no seu arquivo.

````markdown
# Repositório destinado ao trabalho do Robson de Backend

## Instalação de dependências

Execute os seguintes comandos para instalar as bibliotecas necessárias:

```bash
pip install django # instalação do django
pip install djangorestframework # instalação do rest_framework
pip install django-cors-headers # instalação do corsheaders
````

## Sequência de passos para ativar o ambiente de desenvolvimento

Sempre é indicado fazer esse processo. Caso não faça, há um grande risco que posteriormente as versões de bibliotecas e do próprio Python entrem em conflito.

1.  **Criar um ambiente de desenvolvimento:**

    ```bash
    py -m venv venv
    ```

2.  **Ativar o ambiente:**

      * **No CMD:**
        ```cmd
        venv\Scripts\activate
        ```
      * **No PowerShell:**
        ```powershell
        .\venv\Scripts\Activate.ps1
        ```

## Migrações do Banco de Dados

Sempre que fizer muitas alterações nos `.models`, é indicado fazer o `makemigrations` e `migrate` das tabelas:

```bash
python.exe manage.py makemigrations
python.exe manage.py migrate
```

## Sobre a aplicação (FrontEnd) IONIC

O recomendado é rodar a aplicação Ionic separadamente do backend.

-----

## 📱 Guia: Conectando App Android ao Backend Local (Solução Ngrok)

Este guia resolve problemas de conexão (CORS, Firewall, Rede) ao tentar acessar o backend Django local (`localhost:8000`) através de um aplicativo Ionic rodando em um dispositivo Android físico ou emulador.

### Passo 1: Instalação do Ngrok

O Ngrok cria um túnel seguro (HTTPS) da internet pública para o seu computador.

1.  Faça o download do Ngrok para Windows neste link: **[https://ngrok.com/download/windows](https://ngrok.com/download/windows)**
2.  Extraia o arquivo baixado.
3.  Crie uma conta gratuita no site do Ngrok para obter seu **Authtoken**.
4.  No terminal, autentique sua instalação (substitua `<SEU_TOKEN_AQUI>` pelo seu token real):
    ```bash
    ngrok config add-authtoken <SEU_TOKEN_AQUI>
    ```

### Passo 2: Iniciar o Túnel

Com o seu servidor Django rodando na porta 8000, abra um **novo terminal** e execute:

```bash
ngrok http 8000
```

Copie a URL segura gerada que aparece na linha "Forwarding" (exemplo: `https://8a7a-123.ngrok-free.app`).

### Passo 3: Configurar o Backend (Django)

Edite o arquivo `backend/projeto/api/settings.py` para permitir que o Django aceite conexões deste novo endereço externo.

```python
# settings.py

# Permite qualquer host (necessário para o túnel)
ALLOWED_HOSTS = ['*']

# Libera o CORS para o Ionic
CORS_ALLOW_ALL_ORIGINS = True 

# Configuração CRÍTICA para o Ngrok funcionar (CSRF)
CSRF_TRUSTED_ORIGINS = [
    '[https://sua-url-do-ngrok.ngrok-free.app](https://sua-url-do-ngrok.ngrok-free.app)', # 👈 Cole a URL gerada pelo Ngrok aqui
    'http://localhost:4200',
    '[http://127.0.0.1:4200](http://127.0.0.1:4200)',
]
```

### Passo 4: Configurar o Frontend (Ionic)

Atualize os arquivos TypeScript (`.page.ts`) onde você faz as requisições HTTP (Login, Cadastro, etc.).

Substitua `http://127.0.0.1:8000` pela URL do Ngrok:

```typescript
// Exemplo em login-customer.page.ts
// private readonly API_URL = '[http://127.0.0.1:8000/api/customer/](http://127.0.0.1:8000/api/customer/)'; // ❌ Antigo
private readonly API_URL = '[https://sua-url-do-ngrok.ngrok-free.app/api/customer/](https://sua-url-do-ngrok.ngrok-free.app/api/customer/)'; // ✅ Novo
```

### Passo 5: Executar

Siga esta ordem para garantir o funcionamento:

1.  **Terminal 1:** Inicie o Django (`python manage.py runserver`).
2.  **Terminal 2:** Mantenha o Ngrok rodando (`ngrok http 8000`).
3.  **Terminal 3:** Compile e rode o Ionic no Android:
    ```bash
    ionic capacitor run android -l --external
    ```

<!-- end list -->

```
```