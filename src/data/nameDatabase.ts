import type { NameType } from './presetOptions';

export type HeatLevel = '热门' | '常见' | '小众' | '独特';
export type Language = 'zh' | 'en' | 'jp';

export interface PetName {
  id: string;
  name: string;
  type: NameType;
  language: Language;
  pronunciation: string;
  meaning: string;
  origin: string;
  syllableCount: number;
  characterCount: number;
  fluencyScore: number;
  heatScore: number;
  heatLevel: HeatLevel;
  styleTags: string[];
  suitableFor: string[];
  tabooNotes: string[];
}

let _idCounter = 0;
const nextId = () => `pet_${Date.now().toString(36)}_${(_idCounter++).toString(36)}`;

const zhNicknameRaw: [string, string, string, string, string[], string[], number, number][] = [
  ['豆豆', 'dòu dòu', '圆滚滚像豆子一样可爱', '日常昵称，形容小巧圆润', ['cute', 'minimalist'], ['cat', 'dog', 'small', 'chubby'], 5, 92],
  ['奶糖', 'nǎi táng', '像奶糖一样甜甜的宝贝', '食品昵称，来源糖果', ['cute', 'foodie'], ['cat', 'cream', 'white', 'quiet'], 4, 78],
  ['汤圆', 'tāng yuán', '团团圆圆，白白糯糯', '传统食品，元宵节汤圆', ['cute', 'foodie', 'fortune'], ['cat', 'white', 'chubby', 'clingy'], 4, 85],
  ['饭团', 'fàn tuán', '像饭团一样紧实可爱', '日式食品昵称', ['cute', 'foodie', 'japanese'], ['dog', 'chubby', 'loyal'], 4, 65],
  ['布丁', 'bù dīng', '像布丁一样软嫩Q弹', '西式甜品昵称', ['cute', 'foodie', 'western'], ['cat', 'cream', 'quiet', 'clingy'], 5, 88],
  ['可乐', 'kě lè', '快乐可乐，活力满满', '饮料昵称，谐音"快乐"', ['funny', 'foodie', 'cool'], ['dog', 'lively', 'naughty'], 4, 80],
  ['巧克力', 'qiǎo kè lì', '甜蜜浓郁的小宝贝', '西式甜品昵称', ['cute', 'foodie', 'western'], ['cat', 'dog', 'brown', 'clingy'], 4, 72],
  ['麻薯', 'má shǔ', '软糯Q弹的小可爱', '台式甜品昵称', ['cute', 'foodie'], ['cat', 'chubby', 'quiet', 'clingy'], 5, 68],
  ['年糕', 'nián gāo', '年年高升，吉祥软糯', '传统食品，谐音"年高"', ['cute', 'foodie', 'fortune'], ['cat', 'dog', 'chubby'], 4, 55],
  ['芝麻', 'zhī ma', '芝麻开门，聪明伶俐', '食品昵称，形容小黑点', ['cute', 'foodie', 'smart'], ['cat', 'black', 'tuxedo', 'smart'], 4, 60],
  ['花生', 'huā shēng', '花开富贵，生生不息', '食品昵称，吉祥寓意', ['foodie', 'fortune', 'cute'], ['dog', 'small', 'brown', 'loyal'], 4, 45],
  ['棉花糖', 'mián huā táng', '像棉花糖一样蓬松柔软', '甜品昵称，形容毛发蓬松', ['cute', 'foodie'], ['cat', 'white', 'fluffy', 'quiet'], 4, 75],
  ['奶酪', 'nǎi lào', '奶酪般香浓诱人', '西式食品昵称', ['cute', 'foodie', 'western'], ['cat', 'dog', 'cream', 'greedy'], 4, 58],
  ['奶茶', 'nǎi chá', '温暖香甜的陪伴', '流行饮品昵称', ['cute', 'foodie'], ['cat', 'brown', 'cream', 'clingy'], 5, 90],
  ['芒果', 'máng guǒ', '金色芒果，活力四射', '水果昵称', ['cute', 'foodie'], ['cat', 'orange', 'yellow', 'lively'], 4, 62],
  ['西瓜', 'xī guā', '夏天的清凉小可爱', '水果昵称', ['funny', 'foodie'], ['dog', 'lively', 'green'], 4, 50],
  ['草莓', 'cǎo méi', '甜美可爱的小红莓', '水果昵称', ['cute', 'foodie'], ['cat', 'tricolor', 'clingy', 'cute'], 5, 70],
  ['桃子', 'táo zi', '仙桃祝寿，粉嫩可爱', '水果昵称，吉祥寓意', ['cute', 'foodie', 'fortune'], ['cat', 'cream', 'quiet', 'clingy'], 4, 66],
  ['柚子', 'yòu zi', '柚子清香，保佑平安', '水果昵称，谐音"佑子"', ['foodie', 'fortune'], ['dog', 'large', 'calm'], 4, 42],
  ['雪碧', 'xuě bì', '清凉雪碧，透心凉', '饮料昵称', ['funny', 'cool', 'foodie'], ['cat', 'white', 'blue', 'aloof'], 4, 52],
  ['咖啡', 'kā fēi', '香浓咖啡，提神醒脑', '饮品昵称', ['western', 'foodie', 'cool'], ['cat', 'brown', 'lazy', 'smart'], 4, 74],
  ['摩卡', 'mó kǎ', '摩卡咖啡，巧克力风味', '咖啡品类', ['western', 'foodie', 'cute'], ['cat', 'brown', 'tricolor'], 4, 48],
  ['拿铁', 'ná tiě', '丝滑拿铁，温柔醇厚', '咖啡品类', ['western', 'foodie', 'cute'], ['cat', 'cream', 'quiet'], 4, 56],
  ['饼干', 'bǐng gān', '酥脆可口的小饼干', '零食昵称', ['cute', 'foodie'], ['dog', 'small', 'greedy'], 4, 40],
  ['薯片', 'shǔ piàn', '咔嚓脆的快乐零食', '零食昵称', ['funny', 'foodie'], ['dog', 'naughty', 'lively'], 4, 38],
  ['薯条', 'shǔ tiáo', '金黄酥脆的人气小吃', '快餐昵称', ['funny', 'foodie', 'western'], ['dog', 'yellow', 'greedy'], 4, 46],
  ['汉堡', 'hàn bǎo', '圆滚滚的小汉堡', '快餐昵称', ['funny', 'foodie', 'western'], ['dog', 'chubby', 'large'], 4, 44],
  ['寿司', 'shòu sī', '精致小巧的日式料理', '日式食品', ['foodie', 'japanese', 'cute'], ['cat', 'small', 'tricolor'], 4, 35],
  ['拉面', 'lā miàn', '热乎乎的暖心拉面', '日式食品', ['foodie', 'japanese'], ['dog', 'greedy', 'loyal'], 4, 32],
  ['三文鱼', 'sān wén yú', '高级美味的三文鱼', '日料食材，猫最爱', ['foodie', 'japanese'], ['cat', 'orange', 'greedy'], 4, 54],
  ['鱼子酱', 'yú zǐ jiàng', '珍贵的黑珍珠', '高级食材', ['cool', 'foodie'], ['cat', 'black', 'aloof', 'smart'], 3, 28],
  ['虾滑', 'xiā huá', '滑嫩Q弹的虾滑', '火锅食材', ['funny', 'foodie'], ['cat', 'white', 'clingy'], 4, 30],
  ['蟹棒', 'xiè bàng', '鲜甜可口的蟹棒', '火锅食材', ['foodie', 'cute'], ['cat', 'orange', 'clingy'], 4, 34],
  ['章鱼小丸子', 'zhāng yú xiǎo wán zǐ', '圆滚滚的章鱼烧', '日式小吃', ['foodie', 'japanese', 'cute'], ['cat', 'chubby', 'brown'], 3, 36],
  ['铜锣烧', 'tóng luó shāo', '豆沙夹心的日式点心', '日式甜品', ['foodie', 'japanese', 'cute'], ['cat', 'brown', 'greedy'], 4, 26],
  ['和果子', 'hé guǒ zǐ', '精致的日式传统点心', '日式甜品', ['foodie', 'japanese', 'ancient'], ['cat', 'quiet', 'clingy'], 4, 22],
  ['大福', 'dà fú', '大福饼，福气满满', '日式甜品，吉祥寓意', ['foodie', 'japanese', 'fortune', 'cute'], ['cat', 'dog', 'chubby', 'white'], 4, 64],
  ['团子', 'tuán zǐ', '团子大家族，团圆美满', '日式甜品', ['foodie', 'japanese', 'cute'], ['cat', 'dog', 'chubby', 'clingy'], 5, 58],
  ['花卷', 'huā juǎn', '像花卷一样层次丰富', '中式面点', ['funny', 'foodie'], ['cat', 'tricolor', 'fluffy'], 4, 24],
  ['包子', 'bāo zi', '白白胖胖的小包子', '中式面点', ['cute', 'foodie'], ['cat', 'dog', 'chubby', 'white'], 4, 50],
  ['饺子', 'jiǎo zi', '招财进宝的金元宝', '传统食品，形似元宝', ['foodie', 'fortune'], ['dog', 'chubby', 'loyal'], 4, 48],
  ['烧麦', 'shāo mài', '顶部开花的可爱点心', '中式点心', ['foodie', 'cute'], ['cat', 'tricolor', 'small'], 4, 20],
];

const zhFormalRaw: [string, string, string, string, string[], string[], number, number][] = [
  ['子墨', 'zǐ mò', '君子如墨，文采斐然', '古代文人风格，墨指笔墨', ['ancient', 'literary', 'cool'], ['cat', 'black', 'smart', 'aloof'], 5, 72],
  ['星辰', 'xīng chén', '璀璨星辰，前途无量', '宇宙自然意象', ['literary', 'cool', 'fortune'], ['cat', 'dog', 'night', 'blue', 'smart'], 5, 82],
  ['如意', 'rú yì', '万事如意，吉祥顺遂', '传统吉祥语', ['ancient', 'fortune', 'cute'], ['cat', 'dog', 'clingy', 'fortune'], 5, 88],
  ['清风', 'qīng fēng', '两袖清风，高洁自在', '自然意象，文人风骨', ['literary', 'ancient', 'cool'], ['cat', 'aloof', 'quiet', 'white'], 5, 68],
  ['白云', 'bái yún', '白云悠悠，自在逍遥', '自然意象，闲适自在', ['literary', 'cute', 'minimalist'], ['cat', 'white', 'fluffy', 'quiet'], 4, 64],
  ['雅婷', 'yǎ tíng', '优雅婷立，温婉动人', '传统女性风格名字', ['ancient', 'literary'], ['cat', 'quiet', 'clingy', 'female'], 4, 58],
  ['浩然', 'hào rán', '浩然正气，胸襟坦荡', '孟子"吾善养吾浩然之气"', ['ancient', 'cool', 'literary'], ['dog', 'brave', 'loyal', 'male'], 5, 70],
  ['思远', 'sī yuǎn', '志存高远，深思熟虑', '传统励志名字', ['ancient', 'literary', 'cool'], ['cat', 'smart', 'aloof'], 4, 56],
  ['书瑶', 'shū yáo', '书中美玉，温润如玉', '文人风格，瑶指美玉', ['ancient', 'literary', 'fortune'], ['cat', 'quiet', 'smart', 'female'], 4, 52],
  ['语嫣', 'yǔ yān', '语笑嫣然，温婉可人', '天龙八部王语嫣', ['ancient', 'literary', 'cute'], ['cat', 'clingy', 'quiet', 'female'], 5, 76],
  ['璟瑜', 'jǐng yú', '璟玉生辉，瑜玉无瑕', '双玉组合，珍贵美好', ['ancient', 'fortune', 'cool'], ['cat', 'dog', 'smart', 'fortune'], 4, 40],
  ['泽楷', 'zé kǎi', '恩泽广被，楷模表率', '传统君子名字', ['ancient', 'cool', 'fortune'], ['dog', 'loyal', 'brave', 'male'], 4, 48],
  ['沐辰', 'mù chén', '沐浴晨光，希望满满', '自然意象，清晨阳光', ['literary', 'cute', 'fortune'], ['cat', 'dog', 'orange', 'yellow', 'lively'], 5, 66],
  ['婉清', 'wǎn qīng', '婉约清雅，温柔纯净', '诗经"有美一人，清扬婉兮"', ['ancient', 'literary'], ['cat', 'quiet', 'white', 'female'], 5, 60],
  ['若曦', 'ruò xī', '如晨曦般温暖明亮', '自然意象，晨光', ['literary', 'cute', 'fortune'], ['cat', 'orange', 'clingy', 'female'], 4, 62],
  ['北辰', 'běi chén', '北极星般坚定闪耀', '论语"为政以德，譬如北辰"', ['ancient', 'cool', 'literary'], ['dog', 'brave', 'loyal', 'smart'], 5, 54],
  ['南笙', 'nán shēng', '南国笙歌，诗意悠扬', '古典乐器意象', ['ancient', 'literary', 'japanese'], ['cat', 'quiet', 'clingy'], 4, 38],
  ['东篱', 'dōng lí', '采菊东篱下，悠然见南山', '陶渊明诗句，隐逸闲适', ['ancient', 'literary', 'cool'], ['cat', 'aloof', 'quiet', 'lazy'], 4, 44],
  ['西洲', 'xī zhōu', '西洲曲中浪漫意境', '南朝乐府"西洲曲"', ['ancient', 'literary'], ['cat', 'quiet', 'blue', 'aloof'], 4, 28],
  ['北岛', 'běi dǎo', '北方孤岛，神秘独立', '诗人北岛，独立风骨', ['literary', 'cool'], ['cat', 'aloof', 'blue', 'smart'], 4, 32],
  ['长安', 'cháng ān', '长治久安，万世太平', '古都长安，汉唐盛世', ['ancient', 'cool', 'fortune'], ['dog', 'brave', 'loyal', 'large'], 5, 78],
  ['洛阳', 'luò yáng', '洛阳牡丹，国色天香', '古都洛阳，牡丹花城', ['ancient', 'literary', 'fortune'], ['cat', 'beautiful', 'tricolor'], 4, 46],
  ['临安', 'lín ān', '临安初雨，江南烟雨', '南宋都城，诗意江南', ['ancient', 'literary', 'japanese'], ['cat', 'quiet', 'clingy', 'gray'], 4, 34],
  ['金陵', 'jīn líng', '金陵帝王州，虎踞龙盘', '南京古称，王气之地', ['ancient', 'cool'], ['dog', 'brave', 'smart', 'brown'], 4, 30],
  ['姑苏', 'gū sū', '姑苏城外寒山寺', '苏州古称，江南水乡', ['ancient', 'literary', 'cute'], ['cat', 'quiet', 'white', 'clingy'], 4, 26],
  ['广陵', 'guǎng líng', '广陵散绝，竹林清风', '扬州古称，嵇康广陵散', ['ancient', 'cool', 'literary'], ['cat', 'aloof', 'smart', 'quiet'], 4, 22],
  ['未央', 'wèi yāng', '夜如何其？夜未央', '诗经，未尽之意', ['ancient', 'literary', 'cool'], ['cat', 'night', 'black', 'smart'], 5, 74],
  ['扶苏', 'fú sū', '扶苏之木，枝叶茂盛', '诗经，秦公子扶苏', ['ancient', 'cool', 'fortune'], ['dog', 'strong', 'brave', 'male'], 4, 42],
  ['长卿', 'cháng qīng', '司马相如，文采风流', '西汉文学家司马相如字长卿', ['ancient', 'literary', 'cool'], ['cat', 'smart', 'aloof'], 4, 24],
  ['白泽', 'bái zé', '神兽白泽，通晓万物', '上古神兽，辟邪纳福', ['cool', 'fortune', 'ancient'], ['cat', 'dog', 'white', 'smart', 'brave'], 5, 80],
  ['青丘', 'qīng qiū', '青丘之国，九尾狐仙居', '山海经，九尾狐故乡', ['ancient', 'cool', 'literary'], ['cat', 'orange', 'smart', 'mysterious'], 4, 50],
  ['桃夭', 'táo yāo', '桃之夭夭，灼灼其华', '诗经周南，盛赞新娘', ['ancient', 'literary', 'cute'], ['cat', 'pink', 'clingy', 'beautiful'], 5, 68],
  ['甘棠', 'gān táng', '蔽芾甘棠，召公遗爱', '诗经召南，德政爱民', ['ancient', 'literary', 'fortune'], ['dog', 'loyal', 'quiet', 'kind'], 4, 20],
  ['呦呦', 'yōu yōu', '呦呦鹿鸣，食野之苹', '诗经小雅，鹿鸣声', ['ancient', 'literary', 'cute'], ['cat', 'quiet', 'cute'], 5, 36],
  ['鹿鸣', 'lù míng', '鹿鸣呦呦，君子宴乐', '诗经小雅，宴饮嘉宾', ['ancient', 'literary', 'cool'], ['dog', 'loyal', 'friendly', 'graceful'], 4, 30],
  ['雁归', 'yàn guī', '鸿雁南飞，归心似箭', '自然意象，思乡之情', ['literary', 'cool'], ['cat', 'aloof', 'migrating'], 4, 18],
  ['鹤鸣', 'hè míng', '鹤鸣于九皋，声闻于天', '诗经小雅，隐士贤才', ['ancient', 'cool', 'literary'], ['cat', 'white', 'aloof', 'elegant'], 4, 28],
  ['松韵', 'sōng yùn', '松风竹韵，高洁雅致', '四君子松，坚韧不拔', ['ancient', 'cool', 'literary'], ['dog', 'brave', 'loyal', 'strong'], 4, 24],
  ['竹影', 'zhú yǐng', '竹影婆娑，君子风度', '四君子竹，虚心有节', ['ancient', 'literary'], ['cat', 'quiet', 'aloof', 'green'], 4, 22],
  ['兰舟', 'lán zhōu', '兰舟桂桨，诗意江湖', '柳永"兰舟催发"', ['ancient', 'literary', 'cool'], ['cat', 'aloof', 'mysterious'], 4, 16],
  ['星河', 'xīng hé', '银河璀璨，浩瀚无垠', '宇宙意象，壮阔浪漫', ['literary', 'cool', 'fortune'], ['cat', 'dog', 'night', 'smart', 'dreamy'], 5, 72],
  ['月白', 'yuè bái', '月色皎洁，清白无瑕', '传统颜色名，月光白', ['literary', 'ancient', 'cute'], ['cat', 'white', 'quiet', 'elegant'], 4, 56],
  ['青山', 'qīng shān', '青山不改，绿水长流', '自然意象，坚定不变', ['cool', 'literary', 'fortune'], ['dog', 'strong', 'loyal', 'brave'], 4, 48],
  ['绿水', 'lǜ shuǐ', '绿水悠悠，温柔绵长', '自然意象，柔情似水', ['literary', 'cute'], ['cat', 'quiet', 'clingy', 'blue'], 4, 38],
  ['红叶', 'hóng yè', '红叶传情，秋意浓浓', '自然意象，相思之意', ['literary', 'cute'], ['cat', 'orange', 'red', 'autumn'], 4, 42],
  ['知秋', 'zhī qiū', '一叶知秋，敏锐聪慧', '成语，洞察入微', ['literary', 'cool', 'smart'], ['cat', 'smart', 'observant', 'autumn'], 4, 34],
  ['知夏', 'zhī xià', '知了鸣叫，盛夏烂漫', '四季系列，夏日活力', ['literary', 'cute'], ['cat', 'lively', 'summer', 'orange'], 4, 32],
  ['望春', 'wàng chūn', '盼春归，望花开', '四季系列，希望新生', ['literary', 'fortune', 'cute'], ['cat', 'spring', 'cute', 'hopeful'], 4, 20],
  ['怀冬', 'huái dōng', '冬日暖阳，静谧安详', '四季系列，沉静温暖', ['literary', 'cool', 'cute'], ['cat', 'winter', 'white', 'quiet'], 4, 18],
];

const zhReduplicativeRaw: [string, string, string, string, string[], string[], number, number][] = [
  ['咪咪', 'mī mī', '小猫咪的经典爱称', '猫叫声拟声', ['cute', 'minimalist'], ['cat', 'clingy', 'small'], 5, 95],
  ['汪汪', 'wāng wāng', '小狗的可爱叫声', '狗叫声拟声', ['cute', 'minimalist', 'funny'], ['dog', 'lively', 'small'], 5, 90],
  ['圆圆', 'yuán yuán', '圆滚滚的小可爱', '形容圆润可爱', ['cute', 'minimalist'], ['cat', 'dog', 'chubby'], 5, 82],
  ['乖乖', 'guāi guāi', '听话乖巧的小宝贝', '形容温顺听话', ['cute', 'fortune'], ['cat', 'dog', 'clingy', 'quiet'], 5, 88],
  ['乐乐', 'lè lè', '快快乐乐每一天', '快乐吉祥', ['cute', 'fortune', 'minimalist'], ['cat', 'dog', 'lively'], 5, 92],
  ['萌萌', 'méng méng', '萌萌哒小可爱', '网络流行语萌', ['cute', 'funny'], ['cat', 'dog', 'cute', 'small'], 5, 86],
  ['甜甜', 'tián tián', '像糖果一样甜蜜', '形容甜美可爱', ['cute', 'foodie'], ['cat', 'clingy', 'quiet', 'female'], 5, 78],
  ['软软', 'ruǎn ruǎn', '像棉花一样柔软', '形容毛发柔软', ['cute', 'minimalist'], ['cat', 'fluffy', 'quiet', 'clingy'], 5, 72],
  ['糯糯', 'nuò nuò', '像糯米一样软糯', '形容软糯Q弹', ['cute', 'foodie'], ['cat', 'chubby', 'clingy'], 5, 70],
  ['香香', 'xiāng xiāng', '香喷喷的小宝贝', '形容味道香', ['cute', 'minimalist'], ['cat', 'dog', 'clean'], 5, 66],
  ['暖暖', 'nuǎn nuǎn', '像小太阳一样温暖', '形容温暖治愈', ['cute', 'fortune'], ['cat', 'dog', 'clingy', 'orange'], 5, 80],
  ['凉凉', 'liáng liáng', '清凉爽快的小可爱', '形容清爽', ['cute', 'cool'], ['cat', 'aloof', 'white', 'blue'], 5, 58],
  ['冰冰', 'bīng bīng', '冰清玉洁的宝贝', '形容纯净冰冷', ['cool', 'cute'], ['cat', 'white', 'aloof', 'blue'], 5, 64],
  ['泡泡', 'pào pào', '像肥皂泡一样梦幻', '形容梦幻可爱', ['cute', 'funny'], ['cat', 'dog', 'dreamy', 'lively'], 5, 68],
  ['毛毛', 'máo máo', '毛茸茸的小可爱', '形容毛发多', ['cute', 'minimalist'], ['cat', 'dog', 'fluffy'], 5, 84],
  ['球球', 'qiú qiú', '圆滚滚像小球一样', '形容圆润', ['cute', 'minimalist'], ['cat', 'dog', 'chubby', 'small'], 5, 90],
  ['肉肉', 'ròu ròu', '肉嘟嘟的小宝贝', '形容胖乎乎', ['cute', 'foodie'], ['cat', 'dog', 'chubby', 'greedy'], 5, 80],
  ['嘟嘟', 'dū dū', '嘟着嘴的小可爱', '形容嘴巴嘟嘟', ['cute', 'funny'], ['cat', 'dog', 'cute', 'chubby'], 5, 76],
  ['胖胖', 'pàng pàng', '胖乎乎的小宝贝', '形容胖乎乎', ['cute', 'funny'], ['cat', 'dog', 'chubby'], 4, 70],
  ['瘦瘦', 'shòu shòu', '苗条纤细的小可爱', '形容瘦瘦的', ['cute', 'funny'], ['cat', 'dog', 'thin', 'small'], 4, 50],
  ['高高', 'gāo gāo', '高高大大的宝贝', '形容高大', ['cool', 'cute'], ['dog', 'large', 'tall'], 4, 48],
  ['矮矮', 'ǎi ǎi', '小巧玲珑的小可爱', '形容矮矮的', ['cute', 'funny'], ['cat', 'dog', 'small'], 4, 42],
  ['小小', 'xiǎo xiǎo', '小巧玲珑的宝贝', '形容小巧', ['cute', 'minimalist'], ['cat', 'dog', 'small'], 5, 78],
  ['大大', 'dà dà', '大大咧咧的宝贝', '形容大只', ['cool', 'cute', 'funny'], ['dog', 'large'], 4, 52],
  ['笨笨', 'bèn bèn', '笨笨的小可爱', '反差萌昵称', ['funny', 'cute'], ['dog', 'naughty', 'clumsy'], 5, 66],
  ['聪聪', 'cōng cōng', '聪明伶俐的小宝贝', '形容聪明', ['cool', 'fortune', 'cute'], ['cat', 'dog', 'smart'], 5, 62],
  ['懒懒', 'lǎn lǎn', '慵懒嗜睡的小可爱', '形容懒惰', ['funny', 'cute'], ['cat', 'lazy', 'quiet'], 5, 56],
  ['勤勤', 'qín qín', '勤劳活泼的宝贝', '形容勤劳', ['fortune', 'cute'], ['dog', 'lively', 'hardworking'], 4, 40],
  ['闹闹', 'nào nào', '热热闹闹的调皮鬼', '形容爱闹腾', ['funny', 'cute'], ['dog', 'naughty', 'lively'], 5, 68],
  ['静静', 'jìng jìng', '安安静静的乖宝贝', '形容安静', ['cute', 'minimalist'], ['cat', 'quiet', 'aloof'], 5, 74],
  ['动动', 'dòng dòng', '活蹦乱跳的活力宝', '形容爱动', ['cute', 'funny'], ['dog', 'lively', 'naughty'], 4, 46],
  ['快快', 'kuài kuài', '风驰电掣的小快腿', '形容跑得快', ['cool', 'cute'], ['dog', 'fast', 'lively'], 4, 44],
  ['慢慢', 'màn màn', '悠哉游哉的慢郎中', '形容慢悠悠', ['cute', 'funny'], ['cat', 'lazy', 'quiet'], 5, 48],
  ['轻轻', 'qīng qīng', '轻轻柔柔的小宝贝', '形容轻柔', ['cute', 'literary'], ['cat', 'quiet', 'clingy'], 5, 60],
  ['重重', 'zhòng zhòng', '沉甸甸的小肉球', '形容重', ['funny', 'cute'], ['cat', 'dog', 'chubby', 'large'], 4, 38],
  ['深深', 'shēn shēn', '深情款款的宝贝', '形容深沉', ['literary', 'cool'], ['cat', 'aloof', 'mysterious'], 4, 34],
  ['浅浅', 'qiǎn qiǎn', '浅笑嫣然的小可爱', '形容浅浅的', ['literary', 'cute'], ['cat', 'clingy', 'smile'], 5, 54],
  ['浓浓', 'nóng nóng', '浓情蜜意的宝贝', '形容浓厚', ['cute', 'fortune'], ['cat', 'dog', 'clingy'], 4, 42],
  ['淡淡', 'dàn dàn', '云淡风轻的宝贝', '形容淡然', ['literary', 'cool'], ['cat', 'aloof', 'quiet'], 4, 36],
  ['星星', 'xīng xīng', '像星星一样闪耀', '宇宙意象', ['literary', 'cute', 'fortune'], ['cat', 'dog', 'night', 'sparkle'], 5, 88],
  ['月月', 'yuè yuè', '像月亮一样温柔', '宇宙意象', ['literary', 'cute'], ['cat', 'white', 'quiet', 'night'], 5, 82],
  ['日日', 'rì rì', '日日开心，天天向上', '太阳意象', ['fortune', 'cute'], ['dog', 'lively', 'orange'], 4, 50],
  ['年年', 'nián nián', '年年有余，岁岁平安', '吉祥寓意', ['fortune', 'ancient'], ['cat', 'dog', 'fortune', 'long-lived'], 4, 58],
  ['岁岁', 'suì suì', '岁岁平安，长命百岁', '吉祥寓意', ['fortune', 'ancient'], ['cat', 'dog', 'fortune'], 5, 72],
  ['朝朝', 'zhāo zhāo', '朝朝暮暮，朝夕相伴', '诗经"朝朝暮暮"', ['literary', 'ancient', 'fortune'], ['cat', 'dog', 'clingy', 'loyal'], 4, 52],
  ['暮暮', 'mù mù', '暮暮朝朝，长相厮守', '与朝朝配对', ['literary', 'ancient'], ['cat', 'quiet', 'clingy', 'night'], 4, 40],
  ['声声', 'shēng shēng', '声声入耳，萌化人心', '李清照"寻寻觅觅，冷冷清清"', ['literary', 'ancient'], ['cat', 'dog', 'vocal'], 4, 30],
  ['漫漫', 'màn màn', '长路漫漫，有你相伴', '屈原"路漫漫其修远兮"', ['literary', 'cool', 'ancient'], ['dog', 'loyal', 'patient'], 4, 32],
  ['悠悠', 'yōu yōu', '悠悠岁月，自在悠闲', '崔颢"白云千载空悠悠"', ['literary', 'ancient', 'cute'], ['cat', 'lazy', 'quiet', 'aloof'], 5, 66],
  ['匆匆', 'cōng cōng', '时光匆匆，珍惜当下', '朱自清"匆匆"', ['literary', 'cool'], ['dog', 'fast', 'energetic'], 4, 28],
];

const enRaw: [string, string, string, string, string[], string[], number, number][] = [
  ['Lucky', '/ˈlʌki/', '幸运儿，带来好运的宝贝', '英文幸运词汇', ['fortune', 'western', 'cute'], ['cat', 'dog', 'fortune'], 5, 95],
  ['Milo', '/ˈmaɪloʊ/', '战士，勇敢的守护者', '希腊语起源，宠物热门名', ['cool', 'western'], ['dog', 'brave', 'loyal', 'male'], 5, 92],
  ['Coco', '/ˈkoʊkoʊ/', '可可豆，甜蜜可爱', '法语起源，时尚经典', ['cute', 'western', 'foodie'], ['cat', 'dog', 'brown', 'cute'], 5, 94],
  ['Bella', '/ˈbelə/', '美丽的，优雅的', '拉丁语"美丽"，暮光之城', ['literary', 'western', 'cute'], ['cat', 'beautiful', 'quiet', 'female'], 5, 90],
  ['Max', '/mæks/', '最伟大的，最强的', '拉丁语"最大"', ['cool', 'western', 'minimalist'], ['dog', 'brave', 'large', 'male'], 4, 92],
  ['Luna', '/ˈluːnə/', '月亮女神，神秘优雅', '拉丁语月亮，哈利波特', ['literary', 'cool', 'western'], ['cat', 'white', 'night', 'female'], 5, 96],
  ['Oliver', '/ˈɒlɪvər/', '橄榄树，和平使者', '拉丁语起源，雾都孤儿', ['literary', 'western', 'fortune'], ['cat', 'smart', 'quiet', 'male'], 4, 88],
  ['Leo', '/ˈliːoʊ/', '狮子，王者风范', '拉丁语狮子，狮子座', ['cool', 'western', 'fortune'], ['cat', 'dog', 'brave', 'leader'], 4, 86],
  ['Charlie', '/ˈtʃɑːrli/', '自由人，快乐精灵', '英语起源，经典宠物名', ['cute', 'western'], ['dog', 'cat', 'friendly', 'lively'], 4, 84],
  ['Mia', '/ˈmiːə/', '我的，专属的宝贝', '意大利语起源', ['cute', 'western', 'minimalist'], ['cat', 'clingy', 'female'], 4, 90],
  ['Jack', '/dʒæk/', '上帝是仁慈的', '英语经典名字', ['cool', 'western', 'minimalist'], ['dog', 'brave', 'male'], 4, 82],
  ['Lily', '/ˈlɪli/', '百合花，纯洁高贵', '英语花卉名', ['literary', 'cute', 'western'], ['cat', 'white', 'quiet', 'female'], 4, 80],
  ['Tom', '/tɒm/', '双胞胎，经典猫名', '猫和老鼠Tom', ['funny', 'western', 'minimalist'], ['cat', 'naughty', 'smart', 'male'], 3, 78],
  ['Nala', '/ˈnɑːlə/', '礼物，狮子王娜娜', '非洲斯瓦希里语，狮子王', ['cool', 'literary', 'western'], ['cat', 'brave', 'female', 'leader'], 4, 86],
  ['Simba', '/ˈsɪmbə/', '狮子王，王者', '斯瓦希里语狮子', ['cool', 'fortune', 'western'], ['cat', 'dog', 'brave', 'king'], 4, 90],
  ['Garfield', '/ˈɡɑːrfiːld/', '加菲猫，贪吃的橘猫', '漫画加菲猫', ['funny', 'literary', 'foodie'], ['cat', 'orange', 'greedy', 'lazy'], 3, 76],
  ['Husky', '/ˈhʌski/', '哈士奇，西伯利亚雪橇犬', '犬种名，粗犷帅气', ['cool', 'western'], ['dog', 'husky', 'naughty', 'strong'], 2, 70],
  ['Pudding', '/ˈpʊdɪŋ/', '布丁，软嫩甜美', '西式甜品', ['cute', 'foodie', 'western'], ['cat', 'chubby', 'clingy', 'cream'], 2, 68],
  ['Cheese', '/tʃiːz/', '奶酪，香浓美味', '西式食品', ['foodie', 'western', 'funny'], ['cat', 'dog', 'greedy', 'yellow'], 2, 60],
  ['Mochi', '/ˈmoʊtʃi/', '麻薯，软糯Q弹', '日式甜品英文名', ['foodie', 'japanese', 'cute'], ['cat', 'chubby', 'quiet', 'white'], 2, 74],
  ['Cookie', '/ˈkʊki/', '曲奇饼干，甜蜜可口', '西式甜品', ['cute', 'foodie', 'western'], ['cat', 'brown', 'cute', 'greedy'], 2, 82],
  ['Candy', '/ˈkændi/', '糖果，甜甜蜜蜜', '英语糖果', ['cute', 'foodie', 'western'], ['cat', 'cute', 'clingy', 'female'], 2, 78],
  ['Sugar', '/ˈʃʊɡər/', '糖，甜心宝贝', '英语糖', ['cute', 'foodie', 'western'], ['cat', 'clingy', 'cute', 'female'], 2, 72],
  ['Honey', '/ˈhʌni/', '蜂蜜，亲爱的', '英语蜂蜜，爱称', ['cute', 'foodie', 'fortune'], ['cat', 'dog', 'clingy', 'golden'], 2, 80],
  ['Peach', '/piːtʃ/', '桃子，粉嫩可爱', '英语桃子', ['cute', 'foodie'], ['cat', 'pink', 'clingy', 'cute'], 1, 64],
  ['Lemon', '/ˈlemən/', '柠檬，清新活力', '英语柠檬', ['cool', 'foodie', 'literary'], ['cat', 'yellow', 'aloof', 'fresh'], 2, 62],
  ['Cherry', '/ˈtʃeri/', '樱桃，甜美小巧', '英语樱桃', ['cute', 'foodie', 'western'], ['cat', 'red', 'small', 'cute'], 2, 70],
  ['Berry', '/ˈberi/', '浆果，酸甜可口', '英语浆果', ['cute', 'foodie'], ['cat', 'purple', 'small', 'cute'], 2, 56],
  ['Grape', '/ɡreɪp/', '葡萄，硕果累累', '英语葡萄', ['foodie', 'fortune', 'western'], ['cat', 'purple', 'small', 'clustered'], 1, 52],
  ['Mango', '/ˈmæŋɡoʊ/', '芒果，金色活力', '热带水果', ['foodie', 'cute', 'western'], ['cat', 'orange', 'lively', 'exotic'], 2, 66],
  ['Apple', '/ˈæpl/', '苹果，平安健康', '英语苹果，平安果', ['foodie', 'fortune', 'western'], ['cat', 'dog', 'red', 'health'], 2, 68],
  ['Pear', '/per/', '梨，甜蜜蜜', '英语梨', ['foodie', 'cute'], ['cat', 'yellow', 'sweet'], 1, 46],
  ['Plum', '/plʌm/', '李子，紫红美人', '英语李子', ['foodie', 'literary'], ['cat', 'purple', 'quiet', 'cute'], 1, 42],
  ['Coffee', '/ˈkɔːfi/', '咖啡，提神醒脑', '英语咖啡', ['foodie', 'cool', 'western'], ['cat', 'brown', 'lazy', 'smart'], 2, 74],
  ['Tea', '/tiː/', '茶，清雅淡然', '英语茶', ['literary', 'cool', 'japanese'], ['cat', 'quiet', 'aloof', 'green'], 1, 58],
  ['Milk', '/mɪlk/', '牛奶，纯净营养', '英语牛奶', ['foodie', 'cute', 'western'], ['cat', 'white', 'cream', 'quiet'], 1, 66],
  ['Juice', '/dʒuːs/', '果汁，活力满满', '英语果汁', ['foodie', 'cute', 'funny'], ['dog', 'lively', 'sweet'], 1, 50],
  ['Wine', '/waɪn/', '葡萄酒，优雅迷人', '英语葡萄酒', ['cool', 'literary', 'western'], ['cat', 'aloof', 'elegant', 'purple'], 1, 40],
  ['Latte', '/ˈlɑːteɪ/', '拿铁，丝滑温柔', '意大利语咖啡', ['foodie', 'western', 'cute'], ['cat', 'cream', 'quiet', 'clingy'], 2, 60],
  ['Espresso', '/eˈspresoʊ/', '浓缩咖啡，浓烈醇厚', '意大利语浓缩咖啡', ['cool', 'foodie', 'western'], ['cat', 'brown', 'aloof', 'strong'], 3, 34],
  ['Mocha', '/ˈmoʊkə/', '摩卡咖啡，巧克力风味', '摩卡港得名', ['foodie', 'western', 'cute'], ['cat', 'brown', 'tricolor', 'cute'], 2, 54],
  ['Caramel', '/ˈkærəmel/', '焦糖，甜蜜浓郁', '法语焦糖', ['foodie', 'cute', 'western'], ['cat', 'brown', 'golden', 'clingy'], 3, 48],
  ['Hazelnut', '/ˈheɪzlnʌt/', '榛果，香脆可口', '英语榛子', ['foodie', 'western'], ['cat', 'brown', 'small'], 2, 32],
  ['Almond', '/ˈɑːmənd/', '杏仁，健康美味', '英语杏仁', ['foodie', 'fortune', 'western'], ['cat', 'cream', 'small', 'oval'], 2, 38],
  ['Walnut', '/ˈwɔːlnʌt/', '核桃，聪明智慧', '英语核桃', ['foodie', 'smart', 'western'], ['cat', 'brown', 'smart', 'brainy'], 2, 36],
  ['Pistachio', '/pɪˈstæʃioʊ/', '开心果，快乐宝贝', '英语开心果', ['foodie', 'fortune', 'cute'], ['cat', 'green', 'small', 'happy'], 3, 30],
  ['Peanut', '/ˈpiːnʌt/', '花生，朴实可爱', '英语花生', ['foodie', 'cute', 'western'], ['dog', 'small', 'brown', 'cute'], 2, 52],
  ['Cashew', '/ˈkæʃuː/', '腰果，月牙形美人', '英语腰果', ['foodie', 'cute', 'western'], ['cat', 'cream', 'curved', 'cute'], 2, 28],
  ['Macadamia', '/ˌmækəˈdeɪmiə/', '夏威夷果，高级奢华', '夏威夷坚果', ['foodie', 'cool', 'western'], ['cat', 'cream', 'round', 'luxury'], 4, 24],
  ['Pecan', '/pɪˈkɑːn/', '碧根果，长寿健康', '美洲山核桃', ['foodie', 'fortune', 'western'], ['dog', 'brown', 'long', 'healthy'], 2, 26],
  ['Butter', '/ˈbʌtər/', '黄油，香浓丝滑', '英语黄油', ['foodie', 'cute', 'western'], ['cat', 'cream', 'yellow', 'greedy'], 2, 54],
  ['Jam', '/dʒæm/', '果酱，甜蜜浓稠', '英语果酱', ['foodie', 'cute', 'western'], ['cat', 'purple', 'sweet', 'thick'], 1, 40],
  ['Jelly', '/ˈdʒeli/', '果冻，Q弹可爱', '英语果冻', ['foodie', 'cute', 'funny'], ['cat', 'translucent', 'bouncy', 'cute'], 2, 48],
  ['Syrup', '/ˈsɪrəp/', '糖浆，甜蜜流心', '英语糖浆', ['foodie', 'cute', 'western'], ['cat', 'golden', 'sweet', 'sticky'], 2, 34],
  ['Maple', '/ˈmeɪpl/', '枫叶，加拿大象征', '英语枫树', ['literary', 'cool', 'western'], ['cat', 'red', 'autumn', 'elegant'], 2, 56],
  ['Pepper', '/ˈpepər/', '胡椒，火辣活力', '英语胡椒', ['cool', 'foodie', 'funny'], ['dog', 'lively', 'spicy', 'naughty'], 2, 62],
  ['Oreo', '/ˈɔːrioʊ/', '奥利奥，黑白配', '饼干品牌名', ['funny', 'foodie', 'cute'], ['cat', 'tuxedo', 'black-white', 'cute'], 3, 76],
  ['Biscuit', '/ˈbɪskɪt/', '饼干，酥脆可口', '英式饼干', ['foodie', 'cute', 'western'], ['dog', 'light-brown', 'crunchy'], 2, 46],
  ['Pancake', '/ˈpænkeɪk/', '煎饼，圆滚滚', '美式早餐', ['foodie', 'funny', 'western'], ['dog', 'round', 'fluffy', 'chubby'], 2, 44],
];

const jpRaw: [string, string, string, string, string, string[], string[], number, number][] = [
  ['モモ', 'もも', 'Momo', '桃子，粉嫩甜美', '日语桃', ['cute', 'japanese', 'foodie'], ['cat', 'pink', 'clingy'], 2, 90],
  ['ココ', 'ここ', 'Koko', '可可，这里有你', '日语可爱发音', ['cute', 'japanese', 'minimalist'], ['cat', 'dog', 'clingy', 'cute'], 2, 88],
  ['ハナ', 'はな', 'Hana', '花朵，绽放美丽', '日语花/鼻', ['literary', 'japanese', 'cute'], ['cat', 'dog', 'beautiful', 'cute'], 2, 86],
  ['ユキ', 'ゆき', 'Yuki', '雪，纯净洁白', '日语雪/幸', ['literary', 'japanese', 'cool'], ['cat', 'white', 'quiet', 'winter'], 2, 92],
  ['サクラ', 'さくら', 'Sakura', '樱花，浪漫唯美', '日语樱花', ['literary', 'japanese', 'cute'], ['cat', 'pink', 'spring', 'beautiful'], 3, 84],
  ['ミコ', 'みこ', 'Miko', '巫女，神秘圣洁', '日语巫女', ['ancient', 'japanese', 'cool'], ['cat', 'aloof', 'mysterious', 'shrine'], 2, 58],
  ['マリ', 'まり', 'Mari', '真理/茉莉，纯洁', '日语真理/茉莉', ['literary', 'japanese', 'fortune'], ['cat', 'quiet', 'pure', 'female'], 2, 60],
  ['リン', 'りん', 'Rin', '铃，清脆悦耳', '日语铃', ['cute', 'japanese', 'minimalist'], ['cat', 'cat-bell', 'cute', 'small'], 1, 72],
  ['ハル', 'はる', 'Haru', '春，生机盎然', '日语春', ['literary', 'japanese', 'cute'], ['cat', 'dog', 'spring', 'lively'], 2, 78],
  ['ナツ', 'なつ', 'Natsu', '夏，热情活力', '日语夏', ['cute', 'japanese'], ['dog', 'summer', 'lively', 'orange'], 2, 64],
  ['アキ', 'あき', 'Aki', '秋，成熟知性', '日语秋/明', ['literary', 'japanese', 'cool'], ['cat', 'autumn', 'quiet', 'smart'], 2, 66],
  ['フユ', 'ふゆ', 'Fuyu', '冬，静谧安详', '日语冬', ['cool', 'japanese'], ['cat', 'winter', 'white', 'quiet'], 2, 56],
  ['ツキ', 'つき', 'Tsuki', '月，温柔神秘', '日语月', ['literary', 'japanese', 'cool'], ['cat', 'moon', 'night', 'mysterious'], 2, 80],
  ['ホシ', 'ほし', 'Hoshi', '星，闪耀夺目', '日语星', ['literary', 'japanese', 'cute'], ['cat', 'dog', 'star', 'night', 'sparkle'], 2, 76],
  ['ソラ', 'そら', 'Sora', '空，自由辽阔', '日语天空', ['cool', 'japanese', 'literary'], ['cat', 'dog', 'sky', 'aloof', 'free'], 2, 74],
  ['カゼ', 'かぜ', 'Kaze', '风，自在如风', '日语风', ['literary', 'japanese', 'cool'], ['cat', 'dog', 'wind', 'aloof', 'fast'], 2, 60],
  ['クモ', 'くも', 'Kumo', '云，悠闲自在', '日语云/蜘蛛', ['literary', 'japanese', 'cute'], ['cat', 'white', 'cloud', 'lazy', 'quiet'], 2, 50],
  ['アメ', 'あめ', 'Ame', '雨/糖，甜蜜滋润', '日语雨/糖', ['literary', 'japanese', 'cute'], ['cat', 'rain', 'sweet', 'quiet'], 2, 52],
  ['シロ', 'しろ', 'Shiro', '白，纯净如雪', '日语白', ['cute', 'japanese', 'minimalist'], ['cat', 'dog', 'white', 'pure'], 2, 82],
  ['クロ', 'くろ', 'Kuro', '黑，神秘深邃', '日语黑', ['cool', 'japanese', 'minimalist'], ['cat', 'black', 'mysterious', 'aloof'], 2, 78],
  ['モチ', 'もち', 'Mochi', '麻薯，软糯可爱', '日语麻糬', ['foodie', 'japanese', 'cute'], ['cat', 'chubby', 'round', 'white', 'clingy'], 2, 70],
  ['ダンゴ', 'だんご', 'Dango', '团子，团圆美满', '日语团子', ['foodie', 'japanese', 'cute'], ['cat', 'dog', 'chubby', 'round', 'clingy'], 3, 64],
  ['ミツ', 'みつ', 'Mitsu', '蜜/光，甜蜜闪耀', '日语蜜/光', ['cute', 'japanese', 'fortune'], ['cat', 'sweet', 'golden', 'clingy'], 2, 54],
  ['アン', 'あん', 'An', '豆沙/安，甜蜜安心', '日语小豆馅/安', ['foodie', 'japanese', 'cute'], ['cat', 'red-bean', 'sweet', 'quiet'], 1, 46],
  ['センベイ', 'せんべい', 'Senbei', '仙贝，酥脆可口', '日语煎饼', ['foodie', 'japanese'], ['dog', 'crunchy', 'small', 'brown'], 3, 38],
  ['ヨウカン', 'ようかん', 'Youkan', '羊羹，日式传统甜点', '日语羊羹', ['foodie', 'japanese', 'ancient'], ['cat', 'red-bean', 'sweet', 'quiet'], 3, 28],
  ['トコロテン', 'ところてん', 'Tokoroten', '葛切，清凉爽口', '日语心太（葛粉）', ['foodie', 'japanese', 'cool'], ['cat', 'translucent', 'cool', 'summer'], 4, 22],
  ['クズモチ', 'くずもち', 'Kuzumochi', '葛饼，Q弹爽滑', '日语葛饼', ['foodie', 'japanese', 'cute'], ['cat', 'translucent', 'bouncy', 'sweet'], 3, 26],
  ['カステラ', 'かすてら', 'Castella', '长崎蛋糕，香甜松软', '日语长崎蛋糕', ['foodie', 'japanese', 'western'], ['dog', 'yellow', 'fluffy', 'sweet'], 4, 32],
  ['パン', 'ぱん', 'Pan', '面包，软乎乎', '日语面包（葡萄牙语）', ['foodie', 'japanese', 'cute'], ['dog', 'fluffy', 'round', 'chubby'], 1, 62],
  ['ケーキ', 'けーき', 'Cake', '蛋糕，甜蜜庆祝', '日语蛋糕', ['foodie', 'japanese', 'western', 'cute'], ['cat', 'dog', 'sweet', 'celebration'], 2, 58],
  ['プリン', 'ぷりん', 'Purin', '布丁，软嫩丝滑', '日语布丁', ['foodie', 'japanese', 'cute'], ['cat', 'cream', 'sweet', 'wobbly'], 2, 68],
  ['ゼリー', 'ぜりー', 'Zeri', '果冻，Q弹晶莹', '日语果冻', ['foodie', 'japanese', 'cute'], ['cat', 'translucent', 'bouncy', 'sparkle'], 2, 44],
  ['アイス', 'あいす', 'Aisu', '冰淇淋，清凉甜蜜', '日语冰淇淋', ['foodie', 'japanese', 'cute'], ['cat', 'dog', 'cold', 'sweet', 'summer'], 2, 72],
  ['チョコ', 'ちょこ', 'Choco', '巧克力，浓情蜜意', '日语巧克力', ['foodie', 'japanese', 'cute'], ['cat', 'brown', 'sweet', 'clingy'], 2, 66],
  ['キャンディ', 'きゃんでぃ', 'Kyandi', '糖果，缤纷多彩', '日语糖果', ['foodie', 'japanese', 'cute'], ['cat', 'colorful', 'sweet', 'cute'], 3, 54],
  ['クッキー', 'くっきー', 'Kukki', '曲奇，酥脆香甜', '日语曲奇', ['foodie', 'japanese', 'cute'], ['cat', 'brown', 'crunchy', 'cute'], 3, 50],
  ['ビスケット', 'びすけっと', 'Bisuketto', '饼干，奶香浓郁', '日语饼干', ['foodie', 'japanese', 'cute'], ['dog', 'light-brown', 'crunchy'], 4, 42],
  ['マカロン', 'まかろん', 'Makaron', '马卡龙，少女心', '日语马卡龙', ['foodie', 'japanese', 'western', 'cute'], ['cat', 'pastel', 'fancy', 'cute'], 3, 56],
  ['ワッフル', 'わっふる', 'Waffuru', '华夫饼，格子可爱', '日语华夫饼', ['foodie', 'japanese', 'cute'], ['dog', 'brown', 'grid-pattern', 'waffle'], 3, 48],
];

function createPetName(
  name: string,
  type: NameType,
  language: Language,
  pronunciation: string,
  meaning: string,
  origin: string,
  syllableCount: number,
  characterCount: number,
  fluencyScore: number,
  heatScore: number,
  styleTags: string[],
  suitableFor: string[],
  tabooNotes: string[] = []
): PetName {
  let heatLevel: HeatLevel;
  if (heatScore >= 80) heatLevel = '热门';
  else if (heatScore >= 50) heatLevel = '常见';
  else if (heatScore >= 25) heatLevel = '小众';
  else heatLevel = '独特';

  return {
    id: nextId(),
    name,
    type,
    language,
    pronunciation,
    meaning,
    origin,
    syllableCount,
    characterCount,
    fluencyScore: Math.max(1, Math.min(5, fluencyScore)),
    heatScore: Math.max(0, Math.min(100, heatScore)),
    heatLevel,
    styleTags,
    suitableFor,
    tabooNotes,
  };
}

const buildChineseNames = (): PetName[] => {
  const names: PetName[] = [];

  for (const [name, py, meaning, origin, style, suitable, fluency, heat] of zhNicknameRaw) {
    names.push(createPetName(name, 'nickname', 'zh', py, meaning, origin, 2, name.length, fluency, heat, style, suitable));
  }

  for (const [name, py, meaning, origin, style, suitable, fluency, heat] of zhFormalRaw) {
    names.push(createPetName(name, 'formal', 'zh', py, meaning, origin, 2, name.length, fluency, heat, style, suitable));
  }

  for (const [name, py, meaning, origin, style, suitable, fluency, heat] of zhReduplicativeRaw) {
    names.push(createPetName(name, 'reduplicative', 'zh', py, meaning, origin, 2, name.length, fluency, heat, style, suitable));
  }

  return names;
};

const buildEnglishNames = (): PetName[] => {
  const names: PetName[] = [];
  for (const [name, ipa, meaning, origin, style, suitable, syllables, heat] of enRaw) {
    const type: NameType = syllables === 1 ? 'formal' : 'nickname';
    const fluency = syllables <= 2 ? 5 : syllables === 3 ? 4 : 3;
    names.push(createPetName(name, type, 'en', ipa, meaning, origin, syllables, name.length, fluency, heat, style, suitable));
  }
  return names;
};

const buildJapaneseNames = (): PetName[] => {
  const names: PetName[] = [];
  for (const [name, kana, romaji, meaning, origin, style, suitable, syllables, heat] of jpRaw) {
    const pron = `${kana} (${romaji})`;
    const type: NameType = name.length <= 2 ? 'nickname' : 'nickname';
    const fluency = syllables <= 2 ? 5 : syllables === 3 ? 4 : 3;
    names.push(createPetName(name, type, 'jp', pron, meaning, origin, syllables, name.length, fluency, heat, style, suitable));
  }
  return names;
};

export const PET_NAMES: PetName[] = [
  ...buildChineseNames(),
  ...buildEnglishNames(),
  ...buildJapaneseNames(),
];

export const NAME_DATABASE = PET_NAMES;

export const getNamesByType = (type: NameType): PetName[] =>
  PET_NAMES.filter(n => n.type === type);

export const getNamesByLanguage = (lang: Language): PetName[] =>
  PET_NAMES.filter(n => n.language === lang);

export const getRandomNames = (count: number, seed?: number): PetName[] => {
  const arr = [...PET_NAMES];
  if (seed !== undefined) {
    let s = seed;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor((s / 233280) * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } else {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return arr.slice(0, count);
};
