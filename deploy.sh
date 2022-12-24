docker-compose down -v
git pull
cd ./src 
yarn
yarn build
cd ../
docker-compose up -f docker-compose.prod.yml up -d