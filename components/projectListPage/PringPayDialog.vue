<template>
  <el-dialog title="打印" :visible.sync="showPrintPayDialog" width="80%">
    <el-divider></el-divider>
    <el-row :class="[getShowRow != 1 ? 'dis' : '' ]">
      <el-col :span="24" style="margin: 20px 0px">
        <div style="border: 1px solid black; text-align:center" id="payPrintDiv1">
          <div style="height:60px; position: relative; text-align: center">
            <div style="margin-top: 20px; border-bottom: 1px solid black; padding-bottom: 10px; line-height: 30px;display:inline-block; height: 40px; font-size: 26px; font-weight: 600; text-align: center; width: 300px">
              支 出 申 请 单
              <div style="display:inline-block;font-weight:100;font-size:14px;position:absolute; right: 20px;">{{printData.numbering}}</div>
            </div>
          </div>
          <div style="height:30px; position: relative; text-align: center">
            <div style="margin-top: 10px; line-height: 20px;display:inline-block; height: 20px; font-size: 16px; text-align: center; width: 300px">
              {{getCreateTime(printData.ctime)}}
            </div>
          </div>
          <div style="display: inline-block; width:100%;height: 20px; position: relative">
            <div style="display: inline-block; position: absolute; left: 10px">公司：{{printData.coName}}</div>
            <div style="display: inline-block; position: absolute; right: 20px">编号：{{getLevelTwo(printData.name)}}</div>
          </div>
          <div style="position:relative; display:inline-block; border: 3px solid black;width:100%">
            <div style="height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400;border-right: 1px solid black; width: 15%;">
                支出款项:
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:40px;line-height: 40px; width: 85%;text-align:left;padding-left:20px">
                {{getPurposeContent(printData)}}
              </div>
            </div>

            <div style="height: 80px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:80px;line-height: 80px;font-weight:400; width: 15%;">
                计人民币：
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:50px;line-height: 80px; width: 50%;text-align:left;padding-left:20px;border-bottom:1px dashed black;">
                {{printData.moneyCapital}}
              </div>
              <div style="display: inline-block;position: absolute; left:70%;height:50px;line-height: 80px; width: 30%;text-align:left;padding-left:20px;border-bottom:1px dashed black;">
                ￥{{printData.expenditureMoney}}
              </div>
            </div>

            <div style="height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400; width: 15%;border-right: 1px solid black">
                申请人:
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:40px;line-height: 40px; width: 20%;text-align:left;padding-left:20px;border-right: 1px solid black;">
                {{printData.username}}
              </div>
              <div style="display: inline-block;position: absolute; left:35%;height:40px;line-height: 40px;font-weight:400; width: 15%;border-right: 1px solid black">
                领款人:
              </div>
              <div style="display: inline-block;position: absolute; left:50%;height:40px;line-height: 40px; width: 15%;text-align:left;padding-left:20px;border-right: 1px solid black;">

              </div>
              <div style="display: inline-block;position: absolute; left:65%;height:40px;line-height: 40px;font-weight:400; width: 15%;border-right: 1px solid black;">
                报销公司:
              </div>
              <div style="display: inline-block;position: absolute; left:80%;height:40px;line-height: 40px; width: 20%;text-align:left;padding-left:20px;border-right: 1px solid black;">

              </div>
            </div>

            <div style="height: 80px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:80px;line-height: 80px;font-weight:400; width: 15%;">
                部门经理：
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:50px;line-height: 80px; width: 20%;text-align:left;padding-left:20px;border-bottom:1px solid black;">

              </div>
              <div style="display: inline-block;position: absolute; left:35%;height:80px;line-height: 80px;font-weight:400; width: 15%;">
                公司经理：
              </div>
              <div style="display: inline-block;position: absolute; left:50%;height:50px;line-height: 80px; width: 30%;text-align:left;padding-left:20px;border-bottom:1px solid black;">

              </div>
              <div style="display: inline-block;position: absolute; right:5px;height:72px;width:72px;line-height: 80px;text-align:left;background:gray">
                <img style="width:78px; height:78px" :src="qrUrl" />
              </div>
            </div>
          </div>
          <div style="display: inline-block; width:100%;height: 20px; position: relative; margin-bottom: 20px">
            <div style="display: inline-block; position: absolute; left: 0px; font-weight: 400">财务主管：</div>
            <div style="display: inline-block; position: absolute; left: 20%; font-weight: 400">记账：</div>
            <div style="display: inline-block; position: absolute; left: 40%; font-weight: 400">出纳：</div>
            <div style="display: inline-block; position: absolute; left: 60%; font-weight: 400">审核：</div>
            <div style="display: inline-block; position: absolute; left: 80%; font-weight: 400">制单：{{printData.username}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :class="[getShowRow != 2 ? 'dis' : '' ]">
      <el-col :span="24" style="margin: 20px 0px">
        <div style="border: 1px solid black; text-align:center" id="payPrintDiv2">
          <div style="height:60px; position: relative; text-align: center">
            <div style="margin-top: 20px; padding-bottom: 10px; line-height: 30px;display:inline-block; height: 40px; font-size: 26px; font-weight: 600; text-align: center; width: 600px">
              电汇通知单
              <div style="display:inline-block;font-weight:100;font-size:14px;position:absolute; right: 20px;">{{printData.numbering}}</div>
            </div>
          </div>
          <div style="height:30px; position: relative; text-align: center">
            <div style="margin-top: 10px; line-height: 20px;display:inline-block; height: 20px; font-size: 16px; text-align: center; width: 300px">
              {{getCreateTime(printData.ctime)}}
            </div>
          </div>
          <div style="display: inline-block; width:100%;height: 20px; position: relative">
            <div style="display: inline-block; position: absolute; left: 10px">公司：{{printData.coName}}</div>
            <div style="display: inline-block; position: absolute; right: 20px">编号：{{getLevelTwo(printData.name)}}</div>
          </div>
          <div style="position:relative; display:inline-block; border: 3px solid black;width:100%">
            <div style="height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400;border-right: 1px solid black; width: 15%;">
                收款人单位（全称）
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:40px;line-height: 40px; width: 85%;text-align:left;padding-left:20px">
                {{printData.beneficiaryUnit}}
              </div>
            </div>
            <div style="height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400;border-right: 1px solid black; width: 15%;">
                收款人账号
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:40px;line-height: 40px; width: 85%;text-align:left;padding-left:20px">
                {{printData.beneficiaryNumber}}
              </div>
            </div>

            <div style="position: relative; height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400; width: 15%;border-right: 1px solid black">
                汇入地点
              </div>
              <div style="display: inline-block;position: absolute; left:15%;top: 0px;height:40px;line-height: 40px; width: 35%;text-align:left;padding-left:20px;border-bottom:1px solid black;border-right: 1px solid black;">
                {{printData.provinceName}}省 {{printData.cityName}}市/县
              </div>
              <div style="display: inline-block;position: absolute; left:50%;top: 0px;height:40px;line-height: 40px; width: 15%;text-align:left;padding-left:20px;border-bottom:1px solid black;border-right: 1px solid black;">
                汇入行名称
              </div>
              <div style="display: inline-block;position: absolute; left:65%;top: 0px;height:40px;line-height: 40px; width: 35%;text-align:left;padding-left:20px;border-bottom:1px solid black;border-right: 1px solid black;">
                {{printData.beneficiaryBank}}
              </div>
            </div>

            <div style="position:relative; height: 60px;border-bottom: 1px solid black">
              <div style="display:inline-block; position:absolute; left: 0px; top: 0px; width: 15%; line-height: 60px; border-right: 1px solid black">
                电汇金额
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:30px;line-height: 30px;font-weight:400; width: 10%;">
                人民币
              </div>
              <div style="display: inline-block;position: absolute; left:15%;top: 30px; height:30px;line-height: 30px;font-weight:400; width: 10%;">
                (大写)
              </div>
              <div style="display: inline-block;position: absolute; left:25%;height:60px;line-height: 60px; width: 25%;text-align:left; border-right: 1px solid black">
                 {{printData.moneyCapital}}
              </div>
              <div style="display: inline-block;position: absolute; left:50%;height:30px;line-height: 30px;font-weight:400; width: 10%;">
                人民币
              </div>
              <div style="display: inline-block;position: absolute; left:50%;top: 30px; height:30px;line-height: 30px;font-weight:400; width: 10%;">
                (小写)
              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:60px;line-height: 60px; width: 20%;text-align:left;">
                ￥:{{printData.expenditureMoney}}
              </div>
            </div>
            <div style="height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400; width: 15%;">
                备注：
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:40px;line-height: 40px; width: 20%;text-align:left;padding-left:20px;border-right: 1px solid black">

              </div>
              <div style="display: inline-block;position: absolute; left:35%;height:40px;line-height: 40px;font-weight:400; width: 15%;">
                汇款用途：{{printData.expenditurePurposeName}}
              </div>
              <div style="display: inline-block;position: absolute; left:50%;height:40px;line-height: 40px; width: 30%;text-align:left;padding-left:20px;"></div>
            </div>
            <div style="height: 80px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:80px;line-height: 80px;font-weight:400; width: 15%;">
                部门主管：
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:80px;line-height: 80px; width: 20%;text-align:left;padding-left:20px;border-right: 1px solid black">

              </div>
              <div style="display: inline-block;position: absolute; left:35%;height:80px;line-height: 80px;font-weight:400; width: 15%;">
                领导批示：
              </div>
              <div style="display: inline-block;position: absolute; left:50%;height:50px;line-height: 80px; width: 30%;text-align:left;padding-left:20px;"></div>
              <div style="display: inline-block;position: absolute; right:5px;height:72px;width:72px;line-height: 80px;text-align:left;background:gray">
                <img style="width:78px; height:78px" :src="qrUrl" />
              </div>
            </div>
          </div>
          <div style="display: inline-block; width:100%;height: 20px; position: relative; margin-bottom: 20px">
            <div style="display: inline-block; position: absolute; left: 0px; font-weight: 400">申请人：{{printData.username}}</div>
            <div style="display: inline-block; position: absolute; left: 25%; font-weight: 400">出纳：</div>
            <div style="display: inline-block; position: absolute; left: 50%; font-weight: 400">审核人：</div>
            <div style="display: inline-block; position: absolute; left: 75%; font-weight: 400">会计：</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :class="[getShowRow != 3 ? 'dis' : '' ]">
      <el-col :span="24" style="margin: 20px 0px">
        <div style="border: 1px solid black; text-align:center" id="payPrintDiv3">
          <div style="height:60px; position: relative; text-align: center">
            <div style="margin-top: 20px; border-bottom: 1px solid black; padding-bottom: 10px; line-height: 30px;display:inline-block; height: 40px; font-size: 26px; font-weight: 600; text-align: center; width: 300px">
              差旅费用报销单
              <div style="display:inline-block;font-weight:100;font-size:14px;position:absolute; right: 20px;">{{printData.numbering}}</div>
            </div>
          </div>
          <div style="height:30px; position: relative; text-align: center">
            <div style="margin-top: 10px; line-height: 20px;display:inline-block; height: 20px; font-size: 16px; text-align: center; width: 300px">
              {{getCreateTime(printData.ctime)}}
            </div>
          </div>
          <div style="display: inline-block; width:100%;height: 20px; position: relative">
            <div style="display: inline-block; position: absolute; left: 10px">公司：{{printData.coName}}</div>
            <div style="display: inline-block; position: absolute; right: 20px">编号：{{getLevelTwo(printData.name)}}</div>
          </div>
          <div style="position:relative; display:inline-block; border: 3px solid black;width:100%">
            <div style="height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400;border-right: 1px solid black; width: 15%;">
                出差人:
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:40px;line-height: 40px; width: 15%;border-right: 1px solid black;text-align:left;padding-left:20px">
                {{getPurposeContent(printData)}}
              </div>
              <div style="display: inline-block;position: absolute; left:30%;height:40px;line-height: 40px;font-weight:400;border-right: 1px solid black; width: 15%;">
                出差事由:
              </div>
              <div style="display: inline-block;position: absolute; left:45%;height:40px;line-height: 40px; width: 15%;border-right: 1px solid black;text-align:left;padding-left:20px">

              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:40px;line-height: 40px;font-weight:400;border-right: 1px solid black; width: 15%;">
                项目名称:
              </div>
              <div style="display: inline-block;position: absolute; left:75%;height:40px;line-height: 40px; width: 25%;border-right: 1px solid black;text-align:left;padding-left:20px">
                {{printData.name}}
              </div>
            </div>
            <div style="height: 30px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 30%;">
                出发
              </div>
              <div style="display: inline-block;position: absolute; left:30%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 30%;">
                交通
              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 40%;">
                其它费用
              </div>
            </div>
            <div style="height: 30px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">
                月
              </div>
              <div style="display: inline-block;position: absolute; left:3%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">
                日
              </div>
              <div style="display: inline-block;position: absolute; left:6%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">
                时
              </div>
              <div style="display: inline-block;position: absolute; left:9%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">
                地点
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">
                月
              </div>
              <div style="display: inline-block;position: absolute; left:18%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">
                日
              </div>
              <div style="display: inline-block;position: absolute; left:21%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">
                时
              </div>
              <div style="display: inline-block;position: absolute; left:24%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">
                地点
              </div>
              <div style="display: inline-block;position: absolute; left:30%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">
                工具
              </div>
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">
                金额
              </div>
              <div style="display: inline-block;position: absolute; left:48%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 12%;">
                单据张数
              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">
                项目
              </div>
              <div style="display: inline-block;position: absolute; left:70%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 20%;">
                金额
              </div>
              <div style="display: inline-block;position: absolute; left:90%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">
                单据张数
              </div>
            </div>
            <div style="height: 30px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:3%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:6%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:9%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">

              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:18%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:21%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:24%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">

              </div>
              <div style="display: inline-block;position: absolute; left:30%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">

              </div>
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
              <div style="display: inline-block;position: absolute; left:48%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 12%;">

              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">
                住 宿 费
              </div>
              <div style="display: inline-block;position: absolute; left:70%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 20%;">

              </div>
              <div style="display: inline-block;position: absolute; left:90%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
            </div>
            <div style="height: 30px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:3%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:6%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:9%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">

              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:18%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:21%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:24%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">

              </div>
              <div style="display: inline-block;position: absolute; left:30%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">

              </div>
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
              <div style="display: inline-block;position: absolute; left:48%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 12%;">

              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">
                市 内 车 费
              </div>
              <div style="display: inline-block;position: absolute; left:70%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 20%;">

              </div>
              <div style="display: inline-block;position: absolute; left:90%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
            </div>
            <div style="height: 30px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:3%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:6%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:9%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">

              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:18%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:21%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:24%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">

              </div>
              <div style="display: inline-block;position: absolute; left:30%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">

              </div>
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
              <div style="display: inline-block;position: absolute; left:48%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 12%;">

              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">
                餐 费
              </div>
              <div style="display: inline-block;position: absolute; left:70%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 20%;">

              </div>
              <div style="display: inline-block;position: absolute; left:90%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
            </div>
            <div style="height: 30px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:3%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:6%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:9%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">

              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:18%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:21%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:24%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">

              </div>
              <div style="display: inline-block;position: absolute; left:30%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">

              </div>
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
              <div style="display: inline-block;position: absolute; left:48%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 12%;">

              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">
                其它
              </div>
              <div style="display: inline-block;position: absolute; left:70%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 20%;">

              </div>
              <div style="display: inline-block;position: absolute; left:90%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
            </div>
            <div style="height: 30px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:3%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:6%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:9%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">

              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:18%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:21%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 3%;">

              </div>
              <div style="display: inline-block;position: absolute; left:24%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 6%;">

              </div>
              <div style="display: inline-block;position: absolute; left:30%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">

              </div>
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
              <div style="display: inline-block;position: absolute; left:48%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 12%;">

              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
              <div style="display: inline-block;position: absolute; left:70%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 20%;">

              </div>
              <div style="display: inline-block;position: absolute; left:90%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
            </div>
            <div style="height: 30px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 38%;">
                合计
              </div>
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">

              </div>
              <div style="display: inline-block;position: absolute; left:48%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 12%;">

              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 10%;">
                合计
              </div>
              <div style="display: inline-block;position: absolute; left:70%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 30%;">

              </div>
            </div>
            <div style="position:relative; height: 60px;border-bottom: 1px solid black">
              <div style="display:inline-block; position:absolute; left: 0px; top: 0px; width: 6%; line-height: 30px; border-right: 1px solid black">报销</div>
              <div style="display:inline-block; position:absolute; left: 0px; top: 30px; width: 6%; line-height: 30px; border-right: 1px solid black">总额</div>
              <div style="display: inline-block;position: absolute; left:6%;height:30px;line-height: 30px;font-weight:400; width: 12%;">
                人民币
              </div>
              <div style="display: inline-block;position: absolute; left:6%;top: 30px; height:30px;line-height: 30px;font-weight:400; width: 12%;">
                (大写)
              </div>
              <div style="display: inline-block;position: absolute; left:21%;height:60px;line-height: 60px; width: 19%;text-align:left;">
                {{printData.moneyCapital}}
              </div>
              <div style="display: inline-block;position: absolute; left:40%;height:60px;line-height: 60px; width: 20%;text-align:left;border-right: 1px solid black">
                ￥:{{printData.expenditureMoney}}
              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:30px;line-height: 30px; width: 40%;text-align:left;border-bottom: 1px solid black">
                预借金额￥
              </div>
              <div style="display: inline-block;position: absolute; left:60%;height:30px;line-height: 30px; top: 30px; width: 40%;text-align:left;border-bottom: 1px solid black">
                退/补金额￥
              </div>
            </div>
            <div style="height: 80px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:80px;line-height: 80px;font-weight:400; width: 15%;">
                部门主管：
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:80px;line-height: 80px; width: 20%;text-align:left;padding-left:20px;border-right: 1px solid black">

              </div>
              <div style="display: inline-block;position: absolute; left:35%;height:80px;line-height: 80px;font-weight:400; width: 15%;">
                领导批示：
              </div>
              <div style="display: inline-block;position: absolute; left:50%;height:50px;line-height: 80px; width: 30%;text-align:left;padding-left:20px;">

              </div>
              <div style="display: inline-block;position: absolute; right:5px;height:72px;width:72px;line-height: 80px;text-align:left;background:gray">
                <img style="width:78px; height:78px" :src="qrUrl" />
              </div>
            </div>
          </div>
          <div style="display: inline-block; width:100%;height: 20px; position: relative; margin-bottom: 20px">
            <div style="display: inline-block; position: absolute; left: 0px; font-weight: 400">出纳：</div>
            <div style="display: inline-block; position: absolute; left: 25%; font-weight: 400">审核人：</div>
            <div style="display: inline-block; position: absolute; left: 50%; font-weight: 400">会计：</div>
            <div style="display: inline-block; position: absolute; left: 75%; font-weight: 400">领款人：{{printData.username}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :class="[getShowRow != 4 ? 'dis' : '' ]">
      <el-col :span="24" style="margin: 20px 0px">
        <div style="border: 1px solid black; text-align:center" id="payPrintDiv4">
          <div style="height:60px; position: relative; text-align: center">
            <div style="margin-top: 20px; padding-bottom: 10px; line-height: 30px;display:inline-block; height: 40px; font-size: 26px; font-weight: 600; text-align: center; width: 600px">
              {{printData.companyName}} 公司开发票联系单——应收单
              <!-- <div style="display:inline-block;font-weight:100;font-size:14px;position:absolute; right: 20px;">{{printData.numbering}}</div> -->
            </div>
          </div>
          <!-- <div style="height:30px; position: relative; text-align: center">
            <div style="margin-top: 10px; line-height: 20px;display:inline-block; height: 20px; font-size: 16px; text-align: center; width: 300px">
              {{getCreateTime(printData.ctime)}}
            </div>
          </div> -->
          <div style="display: inline-block; width:100%;height: 20px; position: relative">
            <div style="display: inline-block; position: absolute; left: 10px">编号：{{printData.projectName}}</div>
            <div style="display: inline-block; position: absolute; right: 20px">{{printData.invoiceType}}</div>
          </div>
          <div style="position:relative; display:inline-block; border: 3px solid black;width:100%">
            <div style="height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400;border-right: 1px solid black; width: 15%;">
                单位全称
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:40px;line-height: 40px; width: 85%;text-align:left;padding-left:20px">
                {{printData.unitname}}
              </div>
            </div>

            <div style="position: relative; height: 80px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:80px;line-height: 80px;font-weight:400; width: 15%;border-right: 1px solid black">
                发票金额
              </div>
              <div style="display: inline-block;position: absolute; left:15%;top: 0px;height:40px;line-height: 40px; width: 35%;text-align:left;padding-left:20px;border-bottom:1px solid black;border-right: 1px solid black;">
                ￥{{printData.cnyMoney}}
              </div>
              <div style="display: inline-block;position: absolute; left:15%;top:40px;height:40px;line-height: 40px; width: 75%;text-align:left;padding-left:20px;border-bottom:1px solid black;">
                (大写){{printData.moneyCapital}}
              </div>
              <div style="display: inline-block;position: absolute; left:50%;top: 0px;height:40px;line-height: 40px; width: 15%;text-align:left;padding-left:20px;border-bottom:1px solid black;border-right: 1px solid black;">
                服务项目
              </div>
              <div style="display: inline-block;position: absolute; left:65%;top: 0px;height:40px;line-height: 40px; width: 35%;text-align:left;padding-left:20px;border-bottom:1px solid black;border-right: 1px solid black;">
                {{printData.revenueTypeName}}
              </div>
            </div>

            <div style="height: 40px;border-bottom: 1px solid black">
              <div style="display: inline-block;position: absolute; left:0px;height:40px;line-height: 40px;font-weight:400; width: 15%; border-right: 1px solid black">
                总经理签字
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:40px;line-height: 40px; width: 35%;text-align:left;padding-left:20px;border-bottom:1px solid black;border-right: 1px solid black">

              </div>
              <div style="display: inline-block;position: absolute; left:50%;height:40px;line-height: 40px;font-weight:400; width: 15%; border-right: 1px solid black">
                主管签字
              </div>
              <div style="display: inline-block;position: absolute; left:65%;height:40px;line-height: 40px; width: 35%;text-align:left;padding-left:20px;border-bottom:1px solid black;">

              </div>
            </div>
          </div>
          <div style="display: inline-block; width:100%;height: 20px; position: relative; margin-bottom: 20px">
            <div style="display: inline-block; position: absolute; left: 0px; font-weight: 400">申请人：{{printData.username}}</div>
            <div style="display: inline-block; position: absolute; left: 20%; font-weight: 400">申请日期：{{printData.createDatetime}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="printPay" >打印</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import axios from "axios";
import {EnumAccount, EnumAuditType} from "../../utils/EnumUtil";
export default {
  props: ["showVis"],
  data() {
    return {
      showPrintPayDialog: false,
      qrUrl: ""
    };
  },
  computed: {
    printData() {
      return this.$store.state.projectData.printTemp;
    },
    getShowRow() {
      if (this.$store.state.projectData.printTemp.expenditureMethodId == 1) {
        return 1;
      } else if (this.$store.state.projectData.printTemp.expenditureMethodId == 2) {
        return 2;
      } else if (this.$store.state.projectData.printTemp.expenditureMethodId == 3) {
        return 3;
      } else {
        return 4;
      }
    },
    getLevelTwo() {
      return function(projectName) {
        if (!projectName) {
          return;
        }
        let s = projectName.split("-");
        return s[0] + s[1];
      }
    },
    getCreateTime() {
      return function(str) {
        if(!str) {
          return;
        }
        let s = str.split("-");
        return s[0] + "年" + s[1] + "月" + s[2] + "日"
      }
    },
    getPurposeContent() {
      return function(scope) {
        console.log("getPurposeContent", scope);
        return scope.expenditurePurposeId != null && scope.expenditurePurposeId > 0 ?
        scope.expenditurePurposeName : scope.expenditurePurposeContent;
      }
    },
    isShowPrintPayDialog() {
      return this.$store.state.dialogSwitchData.printPayDialogShow;
    }
  },
  watch: {
    printData(val){
      axios.get("/api/common/qrcode?code="+val.numbering).then(
        (rep) => {
          console.log(rep);
          if (rep && rep.data) {
            this.qrUrl = rep.data.data;
            console.log("qrUrl", this.qrUrl);
          }
        },
        () => {}
      );
    },
    showVis(val) {
      if(this.showPrintPayDialog == false) {
        this.showPrintPayDialog = true;
      } else {
        this.showPrintPayDialog = false;
      }
    },
    // showPrintPayDialog() {
    //   this.$store.commit(
    //     "dialogSwitchData/setPrintPayDialogShow",
    //     this.showPrintPayDialog
    //   );
    // },
    // isShowPrintPayDialog(val, oldVal) {
    //   this.showPrintPayDialog = val;
    // },
  },
  methods: {
    printPay() {
      let idName = "payPrintDiv" + this.getShowRow;
      // if (this.$store.state.projectData.printTemp.expenditureMethodId == 2) {
      //   idName = "payPrintDiv";
      // } else if (this.$store.state.projectData.printTemp.expenditureMethodId == 3) {
      //   idName = "payPrintDiv2";
      // } else {
      //   idName = "payPrintDiv3";
      // }
      let bdhtml = window.document.body.innerHTML;
      window.document.body.innerHTML = document.getElementById(idName).innerHTML;
      window.print();
      window.document.body.innerHTML = bdhtml;
      window.location.reload();
    },
    changeMethod() {
      if(this.createForm.expenditureMethodId == 2) {
        this.needShowRow = true;
      } else {
        this.needShowRow = false;
      }
    },
    getLabel: function(scope) {
      console.log(scope);
    },
  },
};
</script>

<style>
.labelSty {
  line-height: 40px;
  text-align: center;
}

.rowSty {
  margin-top: 10px;
}

.showRow {
  display: block;
  margin-top: 10px;
}
.disShowRow {
  display: none;
  margin-top: 10px;
}

.dis {
  display: none;
}
</style>
