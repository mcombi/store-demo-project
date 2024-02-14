# Store project for demoing quarkus and or spring features and also gitops approach.
## store-demo-project
 


## Local development:
For local development Docker must be running. Otherwise you need to configure quarkus to work with podman 
You need to be logged-in on OCP in the right project.
You need maven and openjdk 17 installed on your laptop and and IDE (VSCODE or INTELLIJ)
You need kustomize (https://kubectl.docs.kubernetes.io/installation/kustomize/binaries/)
You need kubeseal (https://github.com/bitnami-labs/sealed-secrets?tab=readme-ov-file#linux)

### Full set up for this project in openshift

1) Install Red Hat Gitops Operator
   2) Apply this policy
    > oc adm policy add-cluster-role-to-user cluster-admin -z openshift-gitops-argocd-application-controller -n openshift-gitops
   3) Grab the admin token to connect to ArgoCD
    > argoPass=$(oc get secret/openshift-gitops-cluster -n openshift-gitops -o jsonpath='{.data.admin\.password}' | base64 -d)
2) Install Amq Streams Operator
3) Install the sealed secret controller ( > oc apply -n kube-system -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.25.0/controller.yaml)
3) Create an Argo Cd application to deploy the infra stuff pointing at: https://github.com/mcombi/store-demo-project.git path: store-common-config
4) Install Openshift Pipelines Operator

To Enable monitoring , use the script in store-common-config/monitoring

### If we want to deploy the containers from developer laptop:


For this demo, the quarkus applications will be deployed from the developer laptop with command:
 a) for a classic build : 
> mvn clean install -Dquarkus.kubernetes.deploy=true

 b) for a native one:
 > mvn clean install -Dquarkus.kubernetes.deploy=true -Dnative

The spring boot application will be deployed via dev tools in ocp, via Add from Git and go with the default options

To run the spring boot application locally:
run containers creation in folder local_dev_tool
> mvn spring-boot:run -Dspring-boot.run.profiles=dev


To add an extension:
For example in prokect quarkus-store-project
> mvn quarkus:add-extension -Dextensions='quarkus-smallrye-openapi'

Then go to Order Resource and decomment the commented code live


### If we want to run this demo using gitops approach:
1) Make sure that you have installed the infra stuff. As the store project contains a datasource that points 
to a service called postgresql.store-demo-test.svc.cluster.local, 
at the moment the infra stuff must be in a namespace called **store-demo-test**

### ArgoCd.
All the application can be deployed using ArgoCd. 
It is possible to manually add all the applications or using oc cli
> oc apply -f (files in argocd/apps)

To use sealed secrets for sensitive secrets: like github or quay credentials
Get Cert from controller (mind the directory where you run this command )

kubeseal --fetch-cert > public-cert.pem

Seal the secret (replace username and token in github-secret-ss):
in the
kubeseal --format yaml --cert ../../../public-cert.pem < github-secret-ss.yaml > github-secret-sealed.yaml

If u have problems with pvc manually create a pv with the same class as the one in the code
