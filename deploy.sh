docker-compose -f docker-compose.prod.yml down -v
git pull
cd ./src 
yarn
yarn build
cd ../
docker-compose -f docker-compose.prod.yml up -d