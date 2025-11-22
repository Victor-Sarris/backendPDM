# Repositório destinado ao trabalho do Robson de Backend

sequecia de passos para ativar o ambiente de desenvolvimento:
```code
1: 'py -m venv venv # criar' um ambiente de desenvolvimento
2: '.venv/Scripts/activate'  # ativar o ambiente
```

Sempre que fizer muitas alterações nos .models, é indicado fazer o makemigrations e migrate das tabelas:

```code
python.exe manage.py makemigrations
python.exe manage.py migrate
```


sobre a aplicação IONIC, o recomendado é rodar ela separadamente