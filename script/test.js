//! 月薪， 为 基本工资 + (绩效 + 补贴 + ... 等其他额外工资)
let basicSalary = 15000;  // 基本工资, 本程序按惯例算作缴纳五险一金的基数工资
let extraSalary = 3000;        // 当月绩效等其他部分工资
//! 年终奖励
let annualExtra = 18000 * 2;

//! 每月社保缴纳基数
let securityBase = basicSalary;     // 本程序按惯例把基本工资算作缴纳五险一金的基数工资
//! 五险缴纳比例
let securityRate = 0.105;

//! 社保基数是否等于公积金基数
let isSecurity_Base_Equal_HouseFound = true;

//! 每月公积金缴纳基数
let houseFoundBase;
if (isSecurity_Base_Equal_HouseFound === true) {
    houseFoundBase = securityBase;
} else {
    throw '暂未支持公积金基数不等于设保基数的计算！';
}

//! 每月公积金缴纳比例
let houseFoundRate = 0.05;
if (houseFoundRate < 0.05 || houseFoundRate > 0.12) {
    throw '错误的公积金缴纳率！';
}

// 每月五险一金缴纳总数额(没有计算额外的3元)
let houseFoundAndSecurity =  (securityBase * securityRate) + (houseFoundBase * houseFoundRate);

//! 每月专项扣除金额
let specialDeduct = 1500;

// 计算单月应纳税所得额
let moneyToBeTaxedMonthly =
        extraSalary + basicSalary - 5000 - houseFoundAndSecurity - (specialDeduct);


if (moneyToBeTaxedMonthly <= 0) {
    throw "您无需缴纳税款。"
}

console.log(
    '\n月工资：' + (basicSalary + extraSalary)
    + '\n基本工资：' + basicSalary
    + '\n\n单个月份的应纳税所得额：\n\n应缴税所得额：' + moneyToBeTaxedMonthly 
    + '\n专项扣除：' + specialDeduct
    + '\n五险：' + securityBase * securityRate 
    + '\n公积金：' + (houseFoundBase * houseFoundRate) + ' * 2 = ' + (2 * houseFoundBase * houseFoundRate)
);



console.log('****************************************');
//! 要计算的月份数
let totalMonth = 12;


//! 年底奖金合并计税
// 所有月份数的总应纳税所得额
let totalMoneyToBeTaxed = totalMonth * moneyToBeTaxedMonthly + annualExtra;

console.log('\n' + totalMonth + '个月份的总应纳税所得额：' + totalMoneyToBeTaxed 
    + '\n年终：' + annualExtra
);

let totalTax = calcTotalTax(totalMoneyToBeTaxed);
console.log(
    '\n使用年终合并计税方案，实际总纳税额为：' + totalTax 
    + '\n全年公积金：' + (totalMonth * 2 * houseFoundBase * houseFoundRate)
    + '\n实际到手总收入：' + (totalMonth * (extraSalary + basicSalary- houseFoundAndSecurity) - totalTax + annualExtra)
    + '\n'
);

console.log('****************************************');

//! 年底奖金不计入总收入，单独换算计税
// 所有月份数的总应纳税所得额
let totalMoneyToBeTaxedAlt = totalMonth * moneyToBeTaxedMonthly;

console.log('\n' + totalMonth + '个月份的总应纳税所得额：' + totalMoneyToBeTaxedAlt 
    + '\n单独计算的年终：' + annualExtra
);

let totalTaxAlt = calcTotalTax(totalMoneyToBeTaxedAlt) + calcAnnualExtraTotalTax(annualExtra);
console.log(
    '\n使用年终单独计算的计税方案，实际总纳税额为：' + totalTaxAlt 
    + '\n全年公积金：' + (totalMonth * 2 * houseFoundBase * houseFoundRate)
    + '\n实际到手总收入：' + (totalMonth * (extraSalary + basicSalary- houseFoundAndSecurity) - totalTaxAlt + annualExtra)
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

// 计算全年年终单独计算时对应的年终应缴税额
function calcAnnualExtraTotalTax(money) {
    let tax;

    let moneyPerMonth = money / 12;

    if (moneyPerMonth <= 3000) {
        tax = moneyPerMonth * 0.03;
    } else if (moneyPerMonth <= 12000) {
        tax = moneyPerMonth * 0.1 - 210;
    } else if (moneyPerMonth <= 25000) {
        tax = moneyPerMonth * 0.2 - 1410;
    } else if (moneyPerMonth <= 35000) {
        tax = moneyPerMonth * 0.25 - 2660;
    } else if (moneyPerMonth <= 55000) {
        tax = moneyPerMonth * 0.3 - 4410;
    } else if (moneyPerMonth <= 80000) {
        tax = moneyPerMonth * 0.35 - 7160;
    } else {
        tax = moneyPerMonth * 0.45 - 15160;
    }

    return tax * 12;
}

// test:
//console.log(calcAnnualExtraTotalTax(24000));    //720
//console.log(calcAnnualExtraTotalTax(60000));    //3480，网上的5790是错的

