import {CoreV1Api, KubeConfig} from '@kubernetes/client-node';

// load k8s config
const kc = new KubeConfig();
kc.loadFromDefault();

// get k8s api version
const k8sApi = kc.makeApiClient(CoreV1Api);

//list all pods corresponding to the namespace
export const listAllPods = (name = 'default') => {
  return k8sApi.listNamespacedPod(name);
};

//create a new namespace
export const createNamespace =(name:{metadata:{name:string}}) => {
  // TODO : check metadata name and arguments
  return  k8sApi.createNamespace(name);
};


// delete namespace
export const deleteNamespace =  (name: string) => {
   return k8sApi.deleteNamespace(name);
};
