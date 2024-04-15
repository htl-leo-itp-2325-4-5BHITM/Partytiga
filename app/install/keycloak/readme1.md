# installation of application server

## nginx installation

```bash
nano /etc/nginx/sites-available/default
```

add following to /etc/nginx/sites-available/default:

```conf
location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                # try_files $uri $uri/ =404;
                proxy_pass http://localhost:8000;

                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $remote_addr;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-Port 443;
        }
```
install network tools:
```bash
apt install -y net-tools
```

nginx neu starten:
```bash
systemctl restart nginx
journalctl -f -u nginx
```

überprüfen ob der https port 443 erreichbar ist:
```bash
netstat -ant | grep LISTEN
```

## zertifikat https installieren

zertifikat bei [certbot](https://certbot.eff.org) anfordern:
nach der installation nginx neustarten

iptables -F
iptables -X

## iptables firewall port 443 freigeben

```bash
nano /etc/iptables/rules.v4
```

```bash
-A INPUT -p tcp -m state --state NEW -m tcp --dport 443 -j ACCEPT
```

```bash
systemctl restart iptables
```
