# CREACION DE KLUSTER K8S
gcloud container clusters create proyecto-g19 --num-nodes=3 --tags=allin,allout --machine-type=n1-standard-2 --no-enable-network-policy

# CREACION NAMESPACE INGRESS CONTROLLER
kubectl create ns nginx-ingress

# INSTALACION INGRESS CONTROLLER
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

helm repo update

helm install nginx-ingress ingress-nginx/ingress-nginx -n nginx-ingress

# INSTALACION LINKERD
curl --proto '=https' --tlsv1.2 -sSfL https://run.linkerd.io/install | sh
linkerd version
linkerd install | kubectl apply -f -

# INSTALACION DASHBOARD
linkerd viz install | kubectl apply -f -
linkerd viz dashboard

# INYECCION LINKERD INGRESS CONTROLLER FRONTEND
kubectl get -n nginx-ingress deploy nginx-ingress-ingress-nginx-controller -o yaml \
| linkerd inject - \
| kubectl apply -f -

# INSTALACION DE KAFKA
kubectl create namespace kafka
kubectl create -f 'https://strimzi.io/install/latest?namespace=kafka' -n kafka
kubectl apply -f createKafka.yaml

# CREACION NAMESPACE
kubectl create namespace squidgame --dry-run=client -o yaml > configInit.yaml

# CREACION DEPLOY SOCKET.IO
kubectl create deploy games-result --image=curtex19/games-result-f3 --replicas=1 --namespace=squidgame --dry-run=client -o yaml >> configInit.yaml

# CREACION LOADBALANCER SOCKET.IO
kubectl expose deploy/games-result --type=LoadBalancer --port=80 --namespace=squidgame --dry-run=client -o yaml >> configInit.yaml

# CREACION DEPLOY LOGS
kubectl create deploy games-logs --image=curtex19/games-logs-f3 --replicas=1 --namespace=squidgame --dry-run=client -o yaml >> configInit.yaml

# CREACION LOADBALANCER LOGS
kubectl expose deploy/games-logs --type=LoadBalancer --port=8080 --namespace=squidgame --dry-run=client -o yaml >> configInit.yaml

# CREACION DEPLOY FRONTEND
kubectl create deploy frontend --image=curtex19/frontend-f3 --replicas=1 --namespace=squidgame --dry-run=client -o yaml >> configReports.yaml

# CREACION CLUSTERIP FRONTEND
kubectl expose deploy/frontend --type=ClusterIP --port=3000 --namespace=squidgame --dry-run=client -o yaml >> configReports.yaml