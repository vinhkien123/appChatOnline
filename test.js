// ib: async function (params) {
//     try {
//         const ibList = { "F1": 50, "F2": 25, "F3": 12.5, "F4": 6.25, "F5": 3.125, "F6": 1.5625, "F7": 0.78125 };
//         var list = [];
//         const level = 2;
//         var parent = '{"F1": 9314, "F2": 9315, "F3": 9107 }';
//         parent = parent.replace('{', '')
//         parent = parent.replace('}', '')
//         parent = parent.replace(/"/g, '');

//         var parentLevel = parent.split(',');
//         await parentLevel.forEach(el => {
//             const objList = el.trim().split(':')
//             list.push({ parent: objList[0], id: parseInt(objList[1]) })
//         });

//         for await (el of list) {
//             var splLevel = el.parent
//             var splLevel = splLevel.replace('F', '');
//             splLevel = parseInt(splLevel)
//             params.user_id = el.id
//             params.livebalance = ibList[el.parent]
/// 
//             if (splLevel > 7) { return false }
//             const result = await checkTbUserLevel(params); //này a dùng promise, e chuyent lại code cty nha
//             if (result || result.level >= splLevel) { return this.updateBalance(params) }
//             const result02 = await dùngIdĐểLấyLevelTrongTable2(params); //này a dùng promise, e chuyent lại code cty nha
//             if (!result02 || result02.level < splLevel) { return false }
//             return this.updateBalance(params)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// },
// updateBalance: function (params) {
//     await query.cộngThêmVàoFieldLiveBalanceTrongTabletb_user(params)
// }