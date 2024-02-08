systemctl start docker
sudo docker rm /postgresql
sudo docker run -itd -e POSTGRES_USER=amine -e POSTGRES_PASSWORD=amine -p 5432:5432 -v /home/emino/data:/var/lib/postgresql/data --name postgresql postgres