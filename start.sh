echo "<<<<<<<<<<<<<<<< stoped all containers >>>>>>>>>>>>>>>>>>"
docker stop $(docker ps -a -q)

echo "<<<<<<<<<<<<<<<< stoped containers removed >>>>>>>>>>>>>>>>>>"
docker rm $(docker ps -a -q)

echo "<<<<<<<<<<<<<<<<<<<< backend API Started >>>>>>>>>>>>>>>>>>>>>"
./backend.sh

echo "<<<<<<<<<<<<<<<<<<<< frontend Started   >>>>>>>>>>>>>>>>>>>>>"
./frontend.sh

