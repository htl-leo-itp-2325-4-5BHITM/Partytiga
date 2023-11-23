```bash
cd ./frontend
npm install
npm install rxjs
npm start

cd ./backend
npm install express
npm install no-cors
node server.js


Datenbank starten starten (postgres... -> bei jedem eigener ordner)
cd ./backend/k8s 
kubectl port-forward postgres-6c844d4dd5-nvl7c 5432:5432

minikube dashboard

```