# less-code
## todo list:
- `完成` resource 配置化
- `完成` base package 配置化
- 模板可选择分组
- 模板缓存、下载、上传
- 模板抽象化配置
  - 模板名称
  - 模板注释
  - 类/接口
  - 具体实现
  - 是否为bean
  - swagger展示与否
  - ...


![image](https://user-images.githubusercontent.com/21019407/115674856-a5ef5900-a380-11eb-8e8e-f4498e320ee3.png)


```
-- pdm
外部危急值报告 EXTERNAL_CRITICAL_VALUE_REPORT 
外部危急值报告标识	EXT_CRITICAL_VALUE_REPORT_ID	numeric(19,0)	19		TRUE	FALSE	TRUE
危急值报告标识	CV_REPORT_ID	numeric(19,0)	19		FALSE	TRUE	FALSE
外部病人标识	EXT_PATIENT_ID	varchar(128)	128		FALSE	FALSE	FALSE
外部危急值报告编码	EXT_CV_REPORT_NO	nvarchar(64)	64		FALSE	FALSE	FALSE
外部医技申请单号	EXT_MEDTECH_SVC_REQ_NO	varchar(64)	64		FALSE	FALSE	FALSE
外部医技报告编码	EXT_MEDTECH_RPT_NO	nvarchar(64)	64		FALSE	FALSE	FALSE
申请人标识	SVC_REQ_ACTION_BY_ID	numeric(19,0)	19		FALSE	FALSE	FALSE
申请科室标识	SVC_REQ_ACTION_BY_DEPT_ID	numeric(19,0)	64		FALSE	FALSE	FALSE
```
![image](https://user-images.githubusercontent.com/21019407/115675143-e64ed700-a380-11eb-96c2-5202c23edcf2.png)
