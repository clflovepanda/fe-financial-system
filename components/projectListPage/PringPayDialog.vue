<template>
  <el-dialog title="打印" :visible.sync="showPrintPayDialog" width="80%">
    <el-divider></el-divider>
    <el-row :class="[getShowRow != 2 ? 'dis' : '' ]">
      <el-col :span="24" style="margin: 20px 0px">
        <div style="border: 1px solid black; text-align:center" id="payPrintDiv">
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
    <el-row :class="[getShowRow != 3 ? 'dis' : '' ]">
      <el-col :span="24" style="margin: 20px 0px">
        <div style="border: 1px solid black; text-align:center" id="payPrintDiv2">
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
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 14%;">
                金额
              </div>
              <div style="display: inline-block;position: absolute; left:52%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">
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
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 14%;">
                
              </div>
              <div style="display: inline-block;position: absolute; left:52%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">
                
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
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 14%;">
                
              </div>
              <div style="display: inline-block;position: absolute; left:52%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">
                
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
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 14%;">
                
              </div>
              <div style="display: inline-block;position: absolute; left:52%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">
                
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
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 14%;">
                
              </div>
              <div style="display: inline-block;position: absolute; left:52%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">
                
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
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 14%;">
                
              </div>
              <div style="display: inline-block;position: absolute; left:52%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">
                
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
              <div style="display: inline-block;position: absolute; left:38%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 14%;">
                
              </div>
              <div style="display: inline-block;position: absolute; left:52%;height:30px;line-height: 30px;font-weight:400;border-right: 1px solid black; width: 8%;">
                
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
              <div style="display: inline-block;position: absolute; left:6%;height:30px;line-height: 30px;font-weight:400; width: 6%;">
                人民币
              </div>
              <div style="display: inline-block;position: absolute; left:6%;top: 30px; height:30px;line-height: 30px;font-weight:400; width: 6%;">
                (大写)
              </div>
              <div style="display: inline-block;position: absolute; left:15%;height:60px;line-height: 60px; width: 25%;text-align:left;">
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
        <div style="border: 1px solid black; text-align:center" id="payPrintDiv3">
          <div style="height:60px; position: relative; text-align: center">
            <div style="margin-top: 20px; padding-bottom: 10px; line-height: 30px;display:inline-block; height: 40px; font-size: 26px; font-weight: 600; text-align: center; width: 600px">
              {{printData.unitname}} 公司开发票联系单——应收单
              <!-- <div style="display:inline-block;font-weight:100;font-size:14px;position:absolute; right: 20px;">{{printData.numbering}}</div> -->
            </div>
          </div>
          <!-- <div style="height:30px; position: relative; text-align: center">
            <div style="margin-top: 10px; line-height: 20px;display:inline-block; height: 20px; font-size: 16px; text-align: center; width: 300px">
              {{getCreateTime(printData.ctime)}}
            </div>
          </div> -->
          <div style="display: inline-block; width:100%;height: 20px; position: relative">
            <div style="display: inline-block; position: absolute; left: 10px">编号：{{printData.invoiceNo}}</div>
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
            <div style="display: inline-block; position: absolute; left: 20%; font-weight: 400">申请日期：{{printData.ctime}}</div>
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
  data() {
    return {
      auditForm: {
        auditType: "",
        remark: "",
      },
      showPrintPayDialog: false
    };
  },
  computed: {
    printData() {
      return this.$store.state.projectData.printTemp;
    },
    getShowRow() {
      if (this.$store.state.projectData.printTemp.expenditureMethodId == 2) {
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
    getRealAuditType() {
      return function(value) {
        return EnumAuditType.getMsg(value);
      }
    },
    auditTable() {
      let list = [];
      if (this.$store.state.expenditureData.auditLog.expenditureAuditLogs) {
        list = this.$store.state.expenditureData.auditLog.expenditureAuditLogs;
      }
      return list;
    },
    isShowPrintPayDialog() {
      return this.$store.state.dialogSwitchData.printPayDialogShow;
    }
  },
  watch: {
    showPrintPayDialog() {
      this.$store.commit(
        "dialogSwitchData/setPrintPayDialogShow",
        this.showPrintPayDialog
      );
    },
    isShowPrintPayDialog(val, oldVal) {
      this.showPrintPayDialog = val;
    },
  },
  methods: {
    printPay() {
      let idName = "";
      if (this.$store.state.projectData.printTemp.expenditureMethodId == 2) {
        idName = "payPrintDiv";
      } else if (this.$store.state.projectData.printTemp.expenditureMethodId == 3) {
        idName = "payPrintDiv2";
      } else {
        idName = "payPrintDiv3";
      }
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