# store-demo-project
Store project for demoing quarkus and or spring features


Checklist:
Docker is running
You are logged-in on OCP in the right project

Full set up for this project:

1) Install Red Hat Gitops Operator
   2) oc adm policy add-cluster-role-to-user cluster-admin -z openshift-gitops-argocd-application-controller -n openshift-gitops
   3) Grab the token argoPass=$(oc get secret/openshift-gitops-cluster -n openshift-gitops -o jsonpath='{.data.admin\.password}' | base64 -d)
2) Install Amq Streams Operator
3) Create an Argo Cd application to deploy the infra stuff pointing at: https://github.com/mcombi/store-demo-project.git path: store-common-config

For this demo, the quarkus applications will be deployed from the developer laptop with command:
 a) for a classic build : mvn clean install -Dquarkus.kubernetes.deploy=true
 b) for a native one: mvn clean install -Dquarkus.kubernetes.deploy=true -Dnative

The spring boot application will be deployed via dev tools in ocp

To run the spring boot application locally:
run containers creation in folder local_dev_tool
mvn spring-boot:run -Dspring-boot.run.profiles=dev


To add an extension:

mvn quarkus:add-extension -Dextensions='quarkus-smallrye-openapi'
