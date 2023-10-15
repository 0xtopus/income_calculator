//! 月薪， 为 基本工资 + (绩效 + 补贴 + ... 等其他额外工资)
let basicSalary = 15000;  // 基本工资, 本程序按惯例算作缴纳五险一金的基数工资
let extraSalary = 0;        // 当月绩效等其他部分工资
//! 年终奖励
let annualExtra = 3 * 15000;

//! 每月社保缴纳基数
let securityBase = basicSalary;     // 本程序按惯例把基本工资算作缴纳五险一金的基数工资
//! 五险缴纳比例
let securityRate = 0.104;

//! 社保基数是否等于公积金基数
let isSecurity_Base_Equal_HouseFound = true;

//! 每月公积金缴纳基数
let houseFoundBase;
if (isSecurity_Base_Equal_HouseFound === true) {
    houseFoundBase = securityBase;
} else {
    throw new Error('暂未支持公积金基数不等于设保基数的计算！');
}

//! 每月公积金缴纳比例
let houseFoundRate = 0.12;
if (houseFoundRate < 0.05 || houseFoundRate > 0.12) {
    throw new Error('错误的公积金缴纳率！');
}

// 每月五险一金缴纳总数额(没有计算额外的3元)
let houseFoundAndSecurity =  (securityBase * securityRate) + (houseFoundBase * houseFoundRate);

//! 每月专项扣除金额
let specialDeduct = 0;

// 计算单月应纳税所得额
let moneyToBeTaxed =
        extraSalary + basicSalary - 5000 - houseFoundAndSecurity - (specialDeduct);


if (moneyToBeTaxed <= 0) {
    throw "您无需缴纳税款。"
}

console.log(
    '\n月工资：' + (basicSalary + extraSalary)
    + '\n基本工资：' + basicSalary
    + '\n\n单个月份的应纳税所得额：\n\n应缴税所得额：' + moneyToBeTaxed 
    + '\n五险：' + securityBase * securityRate 
    + '\n公积金：' + (houseFoundBase * houseFoundRate) + ' * 2 = ' + (2 * houseFoundBase * houseFoundRate)
);

// 要计算的月份数
let totalMonth = 12;
// 所有月份数的总应纳税所得额
let totalMoneyToBeTaxed = totalMonth * moneyToBeTaxed;

console.log('\n' + totalMonth + '个月份的总应纳税所得额：' + totalMoneyToBeTaxed + '\n');

let totalTax = calcTotalTax(totalMoneyToBeTaxed);
console.log(
    '\n实际总纳税额为：' + totalTax 
    + '\n全年公积金：' + (totalMonth * 2 * houseFoundBase * houseFoundRate)
    + '\n实际到手总收入：' + (totalMonth * (basicSalary- houseFoundAndSecurity) - totalTax)
    + '\n'
);


// 计算总应纳税所得额对应的应缴税额
function calcTotalTax(money) {
    let tax;
    if (money <= 36000) {
        tax = money * 0.03;
    } else if (money <= 144000) {
        tax = money * 0.1 - 2520;
    } else if (money <= 300000) {
        tax = money * 0.2 - 16920;
    } else if (money <= 420000) {
        tax = money * 0.25 - 31920;
    } else if (money <= 660000) {
        tax = money * 0.3 - 52920;
    } else if (money <= 960000) {
        tax = money * 0.35 - 85920;
    } else {
        tax = money * 0.45 - 181920;
    }

    return tax;
}



