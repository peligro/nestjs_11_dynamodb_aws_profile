MVP práctico de nestjs 11 con DynamoDB

<hr/>
## 1. Requisitos previos

- Tener instalado Node.js (versión recomendada: 20.x o superior).

- Tener instalado NEST CLI globalmente:
<hr/>
## 2. Librerías utilizadas
<ul>
    <li>
    - Nest client:<br/>
    <code>npm i -g @nestjs/cli</code>
    </li>
    <li>
    - Nest config:<br/>
    <code>npm i --save @nestjs/config</code>
    </li>
    <li>
    - Nest aws para dynamo:<br/>
    <code>npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb</code>
    </li>
    <li>
    - Nest uuid:<br/>
    <code>npm i --save uuid</code>
    </li>
</ul>
<hr/>
## 3. Para instalar DynamoDB localmente usé:<br/>
<ul>
    <li><a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title">https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title</a></li>
</ul>
## 4. Ésto está pensado para una conexión sin usuario y contraseña IAM:<br/>
<ul>
    <li>
    Por ejemplo: arn:aws:iam::{ID IAM}:role/nombre-de-rol-en-aws<br/>
    El profile local que se debe usar es:
        <ul>
            <li>AWS_PROFILE=http://localhost:8000</li>
            <li>AWS_REGION=localhost</li>
        </ul>
    </li>
</ul>
