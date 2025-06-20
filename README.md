<h1>About Orbisense: 👾👾🤖🤖🦾</h1>

<p>
  Have you ever imagined a place where important decisions could be made based on reliable and intelligent data? Now imagine if there were a central hub for all this data, making knowledge clear and, above all,     accessible. Sounds like a dream, right? But this isn't a dream — this is **Smart City**, where cutting-edge technologies like sensors and an online platform come together to offer a clear and simplified experience for accessing information.
  All of this may seem like something from the future, but **the future is now** — and that's where **Orbisense** comes in.
  Our mission is to meet the needs of our users: all those who manage the sensors and environments of the **Senai Roberto Mange Institute**. We strive to deliver a seamless and simple experience through our platform!
</p>

<h2>How to start the Back End:</h2>
<h3>Open the project, go to the back folder, open the CMD, and use the commands:</h3>
<h3>py -m venv env</h3>
<h3>env\scripts\activate</h3>
<h3>pip install -r requirements.txt</h3>
<h3>py manage.py runserver</h3>

<h2>How to start the Front End:</h2>
<h3>Open the project, go to the frontend folder, open the CMD, and use the commands:</h3>
<h3>npm i</h3>
<h3>npm run dev</h3>



<h2>The Back End URLs:</h2>h2>
<h2>User & Password</h2>
<h3>User</h3>
<p>Rafael2</p>

<h3>Password</h3>
<p>24240176</p>

<h2>Sign up</2>
<p>http://127.0.0.1:8000/api/signup/</p>



<h2>Login/ Token</2>
<p>http://127.0.0.1:8000/api/token/</p>



<h2>Import</h2>
<p>http://127.0.0.1:8000/api/upload-xlsx-ambientes/   But put file at the name field</p> 
<p>http://127.0.0.1:8000/api/upload-xlsx-sensores/   But put file at the name field</p> 
<p>http://127.0.0.1:8000/api/upload-xlsx-historicos/   But put file at the name field</p> 



<h2>Sensors</h2>
<p>http://127.0.0.1:8000/api/sensores/</p>
<p>http://127.0.0.1:8000/api/sensor/1/</p>

<h3>Filters</h3>

<h4>Contador</h4>
<p>http://127.0.0.1:8000/api/sensores/?mac_adress=00:1B:44:11:3A:B9&sensor=contador&status=true</p>

<h4>Luminosidade</h4>
<p>http://127.0.0.1:8000/api/sensores/?mac_adress=00:1B:44:11:3A:B9&sensor=luminosidade&status=true</p>

<h4>Umidade</h4>
<p>http://127.0.0.1:8000/api/sensores/?mac_adress=00:1B:44:11:3A:B9&sensor=umidade&status=true</p>

<h4>Umidade</h4>
<p>http://127.0.0.1:8000/api/sensores/?mac_adress=00:1B:44:11:3A:B9&sensor=temperatura&status=true</p>

<h3>Export</h3>
<p>http://localhost:8000/api/exportar/sensores/</p>

<h3>Filtered export</h3>
<p>http://localhost:8000/api/exportar/sensores/?mac_adress=00:1B:44:11:3A:B9&sensor=contador&status=true</p>



<h2>Ambients</h2>
<p>http://127.0.0.1:8000/api/ambientes/</p>
<p>http://127.0.0.1:8000/api/ambiente/1/</p>

<h3>Filters</h3>
<p>http://127.0.0.1:8000/api/ambientes/?sig=20400021&descricao=LAB</p>

<h3>Export</h3>
<p>http://localhost:8000/api/exportar/ambientes/</p>

<h3>Filtered export</h3>
<p>http://localhost:8000/api/exportar/ambientes/?sig=20400021&descricao=LAB</p>



<h2>Historics</h2>
<p>http://localhost:8000/api/historicos/</p>
<p>http://localhost:8000/api/historico/1/</p>

<h3>Filters</h3>

<h4>Range of dates</h4>
<p>http://localhost:8000/api/historicos/?timestamp_range_after=2025-07-01T00:00:00&timestamp_range_before=2025-07-24T23:59:59</p>

<h4>Quadruple filter</h4>
<p>http://localhost:8000/api/historicos/?id_ambiente=4&id_sensor1=&valor=15.39&timestamp=2025-07-24T23:13:00Z</p>

<h4>All filters aplied (Onde tem os filtros de ambientes e sensores aplicado mesmo no histórico)</h4>
<p>http://localhost:8000/api/historicos/?id_ambiente=4&id_sensor1=&valor=15.39&timestamp=2025-07-24T23:13:00Z&sig=20400004&descricao=COPA &mac_adress=00:1B:44:11:3A:B9&sensor=umidade&status=true</p>

<h3>Export</h3>
<p>http://localhost:8000/api/exportar/historicos/</p>

<h3>Filtered export</h3>
<p>http://localhost:8000/api/exportar/historicos/?id_ambiente=4&id_sensor1=&valor=15.39&timestamp=2025-07-24T23:13:00Z</p>
