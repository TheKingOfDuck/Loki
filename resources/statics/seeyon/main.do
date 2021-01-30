



$.ctx.plugins = ["multicall","snail","agent","autoinstall","project","hr","taskmanage","office","blog","redis","uc","mm1","deeExtendClass","indexResume","datarelation","relateMember","performanceReport","wfdynamicform","restlog","https","edoc","meeting","plan","meetingPlaceInfo","contentTemplate","officeOcx","MobileStatistic","index","worktimeset","i18n","formBiz","vjoinPortal","bbs","addressbook","system","gdgm","weixin","seeyonOfficeTrans","sysStatusSensor","behavioranalysis","doc","isearch","extFormFieldRole","lbs","zx","template","snail_archive","timezone","cmp","show","workflowProcess","cip","login","formAdvanced","colCube","trace","rss","dxi","guestbook","inquiry","personalAffair","map","notice","calendar","news","m1","workflowAdvanced","signinmanage","m3","yongzhongOfficeTrans","advanceOffice","designer","genius","usersystem","cloudapp","pdf","wfanalysis","form","collaboration","report","supervise","webservice","webmail","bulletin","attendance"];
$.ctx.resources = null;
$.ctx.customize = null;
$.ctx.CurrentUser = null;

var v3x = new V3X();
v3x.init(_ctxPath, 'zh-cn');
$.v3x = v3x;
$.content = {
    callback : {}
};
//取消遮罩
try{
  if(getCtpTop() && getCtpTop().endProc)getCtpTop().endProc();
}catch(e){}