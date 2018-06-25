import teambition from '../common/teambition';
import config from 'config';
import { eventsForOrganization,
  callbackUrlOrganization } from '../common/constants';
// import projectUtils from '../utils/projectUtils';

export default {

  /**
   * ----{初始化默认执行}----
   * @returns {Promise} Promise
   */
  async init(){
    const token = await teambition.access_token(config.account.email,
      config.account.pwd);
    const organizationId = config.organizationId;
    const organizationHooks = await teambition.
      getHooksByOrganizationId(config.organizationId, token);

    let contains = false;
    for(let hook of organizationHooks) {
      if(callbackUrlOrganization === hook.callbackURL) {
        contains = true;
      }
    }
    console.log('contains', contains);
    if(!contains){
      await teambition.createOrganizationHook(organizationId,
        callbackUrlOrganization, eventsForOrganization, token);
    }

    // 没有归档的企业项目
    // const projects = await teambition.
    //   getAllProjectsByOrganizationId(organizationId, token);
    // console.log('projects', projects);

    // for(let project of projects){
    //   await projectUtils.initProjectData(project);
    // }
  },

}
