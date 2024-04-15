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

nginx restart:

```bash
systemctl restart nginx
journalctl -f -u nginx
```
