# Repositório destinado ao trabalho do Robson de Backend


Instalação de dependências:

```
pip install django # instalação do django
pip install djangorestframework # instalação do rest_framework
pip install django-cors-headers # instalação do corsheaders
```

sequecia de passos para ativar o ambiente de desenvolvimento:
(sempre é indicado fazer esse processo, caso não faça, a um grande risco que posteriormente as versões de bibliotecas e do próprio Python entrem em conflito).


```code
1: 'py -m venv venv' # criar um ambiente de desenvolvimento

2: '.venv/Scripts/activate'  # ativar o ambiente no CMD
3: '.\venv\Scripts\Activate.ps1' # ativar o ambiente no PowerShell

```

Sempre que fizer muitas alterações nos .models, é indicado fazer o makemigrations e migrate das tabelas:

```code
python.exe manage.py makemigrations
python.exe manage.py migrate
```


sobre a aplicação (FrontEnd) IONIC, o recomendado é rodar ela separadamente