# CREACION DE KLUSTER K8S
gcloud container clusters create proyecto-g19 --num-nodes=3 --tags=allin,allout --machine-type=n1-standard-2 --no-enable-network-policy

# CREACION NAMESPACE
kubectl create namespace squidgame --dry-run=client -o yaml > configG19.yaml

# CREACION POD SOCKET.IO
kubectl run games-result --image=curtex19/games-result-f3 --restart=Never --namespace=squidgame --dry-run=client -o yaml >> configG19.yaml

# CREACION CLUSTERIP SOCKET.IO
kubectl expose pod/games-result --type=ClusterIP --port=80 --namespace=squidgame --dry-run=client -o yaml >> configG19.yaml

# CREACION POD LOGS
kubectl run games-logs --image=curtex19/games-logs-f3 --restart=Never --namespace=squidgame --dry-run=client -o yaml >> configG19.yaml

# CREACION CLUSTERIP LOGS
kubectl expose pod/games-logs --type=ClusterIP --port=8080 --namespace=squidgame --dry-run=client -o yaml >> configG19.yaml

# CREACION POD FRONTEND
kubectl run frontend --image=curtex19/frontend-f3 --restart=Never --namespace=squidgame --dry-run=client -o yaml >> configG19.yaml

# CREACION CLUSTERIP FRONTEND
kubectl expose pod/frontend --type=ClusterIP --port=80 --namespace=squidgame --dry-run=client -o yaml >> configG19.yaml

