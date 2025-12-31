import { Course, CourseCategory, CourseType, RequirementRule } from './types';

// Helper to create simple IDs
const id = (code: string) => code.trim();

export const COURSES: Course[] = [
  // ==========================================
  // 1. 公共基础与通识课程
  // ==========================================
  
  // --- 思想政治类 (必修 16+2) ---
  { id: '100032520070', code: '100032520070', name: '思想道德与法治', credit: 2.5, actualCredit: 2.5, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '思想政治类', semester: '1-1', prerequisites: [], graduationReqs: [] },
  { id: '100032520080', code: '100032520080', name: '中国近现代史纲要', credit: 2.5, actualCredit: 2.5, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '思想政治类', semester: '1-2', prerequisites: [], graduationReqs: [] },
  { id: '100032520090', code: '100032520090', name: '马克思主义基本原理', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '思想政治类', semester: '2-1', prerequisites: [], graduationReqs: [] },
  { id: '100032520150', code: '100032520150', name: '毛泽东思想和中国特色社会主义理论体系概论', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '思想政治类', semester: '2-2', prerequisites: [], graduationReqs: [] },
  { id: '100032520140', code: '100032520140', name: '习近平新时代中国特色社会主义思想概论', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '思想政治类', semester: '2-2', prerequisites: [], graduationReqs: [] },
  { id: '100032520120', code: '100032520120', name: '形势与政策', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '思想政治类', semester: '1-4年', prerequisites: [], graduationReqs: [] },
  { id: '100032520130', code: '100032520130', name: '思想政治理论课社会实践', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '思想政治类', semester: '假期', prerequisites: [], graduationReqs: [] },

  // --- 军事体育类 (必修 8) ---
  { id: '100032220010', code: '100032220010', name: '军事理论', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '军事体育类', semester: '1-1', prerequisites: [], graduationReqs: [] },
  { id: '100032220020', code: '100032220020', name: '军训', credit: '2-3周', actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '军事体育类', semester: '1-1', prerequisites: [], graduationReqs: [] },
  { id: 'PE_BASE', code: '-', name: '体育-基础', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '军事体育类', semester: '1-1', prerequisites: [], graduationReqs: [] },
  { id: 'PE_SPECIAL', code: '-', name: '体育-专项', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '军事体育类', semester: '1-2, 2-1', prerequisites: [], graduationReqs: [] },
  { id: 'PE_COMP', code: '-', name: '体育-竞赛', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '军事体育类', semester: '2-2', prerequisites: [], graduationReqs: [] },

  // --- 外语类 (必修 8) ---
  { id: '100031020010', code: '100031020010', name: '大学英语1', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '外语类', semester: '1-1', prerequisites: [], graduationReqs: [] },
  { id: '100031020020', code: '100031020020', name: '大学英语2', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '外语类', semester: '1-2', prerequisites: ['100031020010'], graduationReqs: [] },
  { id: '100031020030', code: '100031020030', name: '大学英语3', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '外语类', semester: '2-1', prerequisites: ['100031020020'], graduationReqs: [] },
  { id: '100031020040', code: '100031020040', name: '大学英语4', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '外语类', semester: '2-2', prerequisites: ['100031020030'], graduationReqs: [] },

  // --- 数学与自然科学类 (必修 32) ---
  { id: '100031120032', code: '100031120032', name: '工科数学分析基础1', credit: 5, actualCredit: 5, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '1-1', prerequisites: [], graduationReqs: [1] },
  { id: '100031120042', code: '100031120042', name: '工科数学分析基础2', credit: 6, actualCredit: 6, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '1-2', prerequisites: ['100031120032'], graduationReqs: [1] },
  { id: '100031120110', code: '100031120110', name: '线性代数与解析几何', credit: 3.5, actualCredit: 3.5, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '1-1', prerequisites: [], graduationReqs: [1] },
  { id: '100031120140', code: '100031120140', name: '概率与统计 A', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '2-1', prerequisites: ['100031120032'], graduationReqs: [1] },
  { id: '100031220010', code: '100031220010', name: '大学物理 A1', credit: 3.5, actualCredit: 3.5, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '1-2', prerequisites: ['100031120032'], graduationReqs: [1] },
  { id: '100031220020', code: '100031220020', name: '大学物理 A2', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '2-1', prerequisites: ['100031220010'], graduationReqs: [1] },
  { id: '100031220040', code: '100031220040', name: '大学物理实验1', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '2-1', prerequisites: [], graduationReqs: [1, 4] },
  { id: '100031220050', code: '100031220050', name: '大学物理实验2', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '2-2', prerequisites: [], graduationReqs: [1, 4] },
  { id: '100031120160', code: '100031120160', name: '复变函数', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '2-1', prerequisites: ['100031120032'], graduationReqs: [1] },
  { id: '100033420030', code: '100033420030', name: '积分变换与场论C', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '2-1', prerequisites: ['100031120042'], graduationReqs: [1] },
  { id: '100033520030', code: '100033520030', name: '离散数学', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', semester: '2-1', prerequisites: [], graduationReqs: [1] },

  // ==========================================
  // 2. 专业课程
  // ==========================================

  // --- 计算机类 ---
  { id: '100033410010', code: '100033410010', name: '程序设计基础 A', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '计算机类', semester: '1-1', prerequisites: [], graduationReqs: [1, 5] },

  // --- 学科与大类基础 ---
  { id: '100030530140', code: '100030530140', name: '工程制图 D', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '学科与大类基础课程', semester: '1-1', prerequisites: [], graduationReqs: [1] },
  { id: '100035330100', code: '100035330100', name: '电路理论 1', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '学科与大类基础课程', semester: '1-2', prerequisites: ['100031120032', '100031220010'], graduationReqs: [1, 2] },
  { id: '100035330160', code: '100035330160', name: '模拟电子线路', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '学科与大类基础课程', semester: '2-1', prerequisites: ['100035330100'], graduationReqs: [1, 3] },
  { id: '100035330260', code: '100035330260', name: '数字电路与系统', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '学科与大类基础课程', semester: '2-2', prerequisites: ['100035330160'], graduationReqs: [1, 3] },
  { id: '100033430020', code: '100033430020', name: '自动化专业导论', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '学科与大类基础课程', semester: '1-1', prerequisites: [], graduationReqs: [1] },

  // --- 专业基础 ---
  { id: '100033440011', code: '100033440011', name: '数据结构', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '专业基础课程', semester: '2-1', prerequisites: ['100033410010'], graduationReqs: [1, 2] },
  { id: '100033440200', code: '100033440200', name: '计算机原理', credit: 4, actualCredit: 4, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '专业基础课程', semester: '3-1', prerequisites: ['100035330260'], graduationReqs: [1, 2] },
  { id: '100033430090', code: '100033430090', name: '现代控制理论基础(双语)', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '专业基础课程', semester: '3-2', prerequisites: ['100033470180'], graduationReqs: [1, 2] },
  { id: '100033470180', code: '100033470180', name: '自动控制原理 A', credit: 4, actualCredit: 4, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '专业基础课程', semester: '3-1', prerequisites: ['100031120042', '100035330100'], graduationReqs: [1, 2] },
  { id: '100033470080', code: '100033470080', name: '计算机控制技术', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '专业基础课程', semester: '3-2', prerequisites: ['100033470180'], graduationReqs: [2, 3] },

  // --- 专业主干 ---
  { id: '100033430060', code: '100033430060', name: '检测技术及仪表', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '专业主干必修课程', semester: '3-1', prerequisites: [], graduationReqs: [3, 5] },
  { id: '100033430030', code: '100033430030', name: '电机与拖动', credit: 3, actualCredit: 3, type: CourseType.Compulsory, category: CourseCategory.ProfessionalClass, subCategory: '专业主干必修课程', semester: '2-2', prerequisites: ['100035330100'], graduationReqs: [1, 2] },

  // --- 选修模块 ---
  { id: '100033430110', code: '100033430110', name: '电力电子技术', credit: 3, actualCredit: 3, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块一: 运动控制方向', semester: '3-1', prerequisites: [], graduationReqs: [] },
  { id: '100033441200', code: '100033441200', name: '自动控制系统', credit: 3, actualCredit: 3, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块一: 运动控制方向', semester: '3-2', prerequisites: ['100033470180'], graduationReqs: [] },
  { id: '100033441300', code: '100033441300', name: '工厂供电', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块一: 运动控制方向', semester: '4-1', prerequisites: [], graduationReqs: [] },
  { id: '100033430070', code: '100033430070', name: '智能机器人技术', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块一: 运动控制方向', semester: '4-1', prerequisites: [], graduationReqs: [] },
  
  { id: '100033442100', code: '100033442100', name: '过程控制工程', credit: 3, actualCredit: 3, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块二: 过程控制方向', semester: '3-2', prerequisites: [], graduationReqs: [] },
  { id: '100033442200', code: '100033442200', name: '控制仪表及装置', credit: 3, actualCredit: 3, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块二: 过程控制方向', semester: '3-1', prerequisites: [], graduationReqs: [] },
  { id: '100033442300', code: '100033442300', name: '分布式控制系统', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块二: 过程控制方向', semester: '4-1', prerequisites: [], graduationReqs: [] },
  { id: '100033430080', code: '100033430080', name: '先进控制技术', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块二: 过程控制方向', semester: '4-1', prerequisites: [], graduationReqs: [] },

  { id: '100033443090', code: '100033443090', name: '神经网络导论', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块三: 自动化专业高级课程', semester: '3-2', prerequisites: [], graduationReqs: [] },
  { id: '100033443020', code: '100033443020', name: '现代智能优化算法', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块三: 自动化专业高级课程', semester: '3-2', prerequisites: [], graduationReqs: [] },
  { id: '100033430100', code: '100033430100', name: '智能控制系统(双语)', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块三: 自动化专业高级课程', semester: '3-2', prerequisites: [], graduationReqs: [] },
  { id: '100033430040', code: '100033430040', name: '智能数据分析与最优化', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块三: 自动化专业高级课程', semester: '4-1', prerequisites: [], graduationReqs: [] },
  { id: '100033430050', code: '100033430050', name: '航空发动机控制系统', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块三: 自动化专业高级课程', semester: '4-1', prerequisites: [], graduationReqs: [] },
  { id: '100033440700', code: '100033440700', name: '单片机原理及应用A', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块四: 专业基础选修课', semester: '3-2', prerequisites: [], graduationReqs: [] },
  { id: '100033430120', code: '100033430120', name: '系统仿真与设计', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块四: 专业基础选修课', semester: '3-2', prerequisites: [], graduationReqs: [] },
  { id: '2020530050', code: '2020530050', name: '系统辨识', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块五: 本研衔接', semester: '4-2', prerequisites: [], graduationReqs: [] },
  { id: '2020540070', code: '2020540070', name: '嵌入式系统设计原理及其应用', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块五: 本研衔接', semester: '4-2', prerequisites: [], graduationReqs: [] },
  { id: '2020540170', code: '2020540170', name: '数据挖掘理论与方法', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', module: '模块五: 本研衔接', semester: '4-2', prerequisites: [], graduationReqs: [] },

  // --- 实践课程 ---
  // Compulsory
  { id: '100051640080', code: '100051640080', name: '电路实验', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '1-2', prerequisites: ['100035330100'], graduationReqs: [4] },
  { id: '100035340060', code: '100035340060', name: '电类创新实践训练', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '1-2', prerequisites: [], graduationReqs: [4] },
  { id: '100051630120', code: '100051630120', name: '数字电路综合设计实验', credit: 1.5, actualCredit: 1.5, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '2-2', prerequisites: ['100035330260'], graduationReqs: [3, 5] },
  { id: '100051630130', code: '100051630130', name: '模拟电子线路综合设计实验', credit: 1.5, actualCredit: 1.5, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '2-1', prerequisites: ['100035330160'], graduationReqs: [3, 5] },
  { id: '1000334110010', code: '1000334110010', name: '程序设计基础 A 课程设计', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '1-1', prerequisites: ['100033410010'], graduationReqs: [3, 5] },
  { id: '100033440110', code: '100033440110', name: '自动控制原理实验 A', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '3-1', prerequisites: ['100033470180'], graduationReqs: [4] },
  { id: '100033440510', code: '100033440510', name: '现代控制理论基础实验', credit: 0.5, actualCredit: 0.5, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '3-2', prerequisites: ['100033430090'], graduationReqs: [4] },
  { id: '100033440410', code: '100033440410', name: '检测技术及仪表实验', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '3-1', prerequisites: ['100033430060'], graduationReqs: [4] },
  { id: '100033440310', code: '100033440310', name: '电机与拖动实验', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '2-2', prerequisites: ['100033430030'], graduationReqs: [4] },
  { id: '100033440810', code: '100033440810', name: '可编程控制器实验 A', credit: 0.5, actualCredit: 0.5, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '4-1', prerequisites: [], graduationReqs: [5] },
  { id: '100033440060', code: '100033440060', name: '可编程控制器课程设计', credit: 1.5, actualCredit: 1.5, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '4-1', prerequisites: [], graduationReqs: [3] },
  { id: '100033440620', code: '100033440620', name: '计算机控制技术课程设计', credit: 0.5, actualCredit: 0.5, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '3-2', prerequisites: ['100033470080'], graduationReqs: [3] },
  { id: '100051640130', code: '100051640130', name: '计算机原理实验', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '3-1', prerequisites: ['100033440200'], graduationReqs: [4] },
  { id: '100030561530', code: '100030561530', name: '工程训练 B', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '1-3', prerequisites: [], graduationReqs: [5] },
  { id: '100033440150', code: '100033440150', name: '认识实习', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '2-3', prerequisites: [], graduationReqs: [4] },
  { id: '100051640230', code: '100051640230', name: '电子工程训练 A', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '2-3', prerequisites: [], graduationReqs: [5] },
  { id: '100033440130', code: '100033440130', name: '生产实习', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', semester: '4-2', prerequisites: [], graduationReqs: [4] },
  { id: '100033440160', code: '100033440160', name: '毕业设计（论文）', credit: 15, actualCredit: 15, type: CourseType.Compulsory, category: CourseCategory.Practice, subCategory: '毕业设计(论文)', semester: '4-2', prerequisites: [], graduationReqs: [2, 3, 4, 6, 7, 10, 11, 12] },

  // Elective Modules
  // Module 1: Motion Control
  { id: '100033441110', code: '100033441110', name: '电力电子技术实验 A', credit: 1, actualCredit: 1, type: CourseType.Elective, category: CourseCategory.Practice, subCategory: '实践课选修模块', module: '运动控制方向', semester: '3-1', prerequisites: [], graduationReqs: [] },
  { id: '100033441210', code: '100033441210', name: '自动控制系统实验', credit: 0.5, actualCredit: 0.5, type: CourseType.Elective, category: CourseCategory.Practice, subCategory: '实践课选修模块', module: '运动控制方向', semester: '3-2', prerequisites: [], graduationReqs: [] },
  { id: '100033441420', code: '100033441420', name: '运动控制课程设计', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.Practice, subCategory: '实践课选修模块', module: '运动控制方向', semester: '3-3', prerequisites: [], graduationReqs: [] },
  { id: '100033440070', code: '100033440070', name: '智能机器人技术课程设计', credit: 1, actualCredit: 1, type: CourseType.Elective, category: CourseCategory.Practice, subCategory: '实践课选修模块', module: '运动控制方向', semester: '4-1', prerequisites: [], graduationReqs: [] }, // Added
  // Module 2: Process Control
  { id: '100033442420', code: '100033442420', name: '过程控制课程设计', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.Practice, subCategory: '实践课选修模块', module: '过程控制方向', semester: '3-3', prerequisites: [], graduationReqs: [] },
  { id: '100033442110', code: '100033442110', name: '过程控制工程实验', credit: 1, actualCredit: 1, type: CourseType.Elective, category: CourseCategory.Practice, subCategory: '实践课选修模块', module: '过程控制方向', semester: '3-2', prerequisites: [], graduationReqs: [] },
  { id: '100033442210', code: '100033442210', name: '控制仪表及装置实验', credit: 0.5, actualCredit: 0.5, type: CourseType.Elective, category: CourseCategory.Practice, subCategory: '实践课选修模块', module: '过程控制方向', semester: '3-1', prerequisites: [], graduationReqs: [] }, // Added
  { id: '100033440090', code: '100033440090', name: '先进控制课程设计', credit: 0.5, actualCredit: 0.5, type: CourseType.Elective, category: CourseCategory.Practice, subCategory: '实践课选修模块', module: '过程控制方向', semester: '4-1', prerequisites: [], graduationReqs: [] }, // Added
  // Module 3: Computer
  { id: '100033440050', code: '100033440050', name: '数据结构课程设计', credit: 1, actualCredit: 1, type: CourseType.Elective, category: CourseCategory.Practice, subCategory: '实践课选修模块', module: '计算机类选修模块', semester: '2-1', prerequisites: [], graduationReqs: [] }, // Added
  { id: '100051640140', code: '100051640140', name: '单片机原理及应用实验A', credit: 1, actualCredit: 1, type: CourseType.Elective, category: CourseCategory.Practice, subCategory: '实践课选修模块', module: '计算机类选修模块', semester: '3-2', prerequisites: [], graduationReqs: [] }, // Added


  // --- 创新创业 & 第二课堂 ---
  // Innovation (Total 2 credits)
  // Replaced with specific courses from image
  { id: '100032010010', code: '100032010010', name: '创造性思维与创新方法', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.Innovation, subCategory: '创新创业教育', semester: '1,2,3', prerequisites: [], graduationReqs: [] },
  { id: '100032010020', code: '100032010020', name: '批判与创意思考', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.Innovation, subCategory: '创新创业教育', semester: '1,2,3', prerequisites: [], graduationReqs: [] },
  { id: '100032010030', code: '100032010030', name: '创新创业基础', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.Innovation, subCategory: '创新创业教育', semester: '1,2', prerequisites: [], graduationReqs: [] },
  { id: '100032950010', code: '100032950010', name: '创业基础与实务', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.Innovation, subCategory: '创新创业教育', semester: '1,2', prerequisites: [], graduationReqs: [] },
  { id: '100032010021', code: '100032010021', name: '创新创业实践', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.Innovation, subCategory: '创新创业教育', semester: '1,2', prerequisites: [], graduationReqs: [] },
  { id: '100034310050', code: '100034310050', name: '创业管理', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.Innovation, subCategory: '创新创业教育', semester: '1,2', prerequisites: [], graduationReqs: [] },
  
  { id: '100011260011', code: '100011260011', name: '大学生创新创业训练计划', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.Innovation, subCategory: '创新创业教育', semester: 'Any', prerequisites: [], graduationReqs: [] },

  // Second Class (Compulsory 8 credits, NOT in total)
  { id: '100012520010', code: '100012520010', name: '健康教育', credit: 0.5, actualCredit: 0.5, type: CourseType.Compulsory, category: CourseCategory.SecondClass, subCategory: '第二课堂', semester: '1-1', prerequisites: [], graduationReqs: [] },
  { id: '100011360010', code: '100011360010', name: '大学生心理健康教育', credit: 2, actualCredit: 2, type: CourseType.Compulsory, category: CourseCategory.SecondClass, subCategory: '第二课堂', semester: '1-1', prerequisites: [], graduationReqs: [] },
  { id: '100010660020', code: '100010660020', name: '社会实践', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.SecondClass, subCategory: '第二课堂', semester: '假期', prerequisites: [], graduationReqs: [] },
  { id: '100011260030', code: '100011260030', name: '国家安全教育', credit: 1, actualCredit: 1, type: CourseType.Compulsory, category: CourseCategory.SecondClass, subCategory: '第二课堂', semester: '1-2', prerequisites: [], graduationReqs: [] },
  // Labor
  { id: '100011360021', code: '100011360021', name: '劳动 1-1', credit: 0.5, actualCredit: 0.5, type: CourseType.Compulsory, category: CourseCategory.SecondClass, subCategory: '第二课堂', module: '劳动教育', semester: '1-2', prerequisites: [], graduationReqs: [] },
  { id: '100011360022', code: '100011360022', name: '劳动 1-2', credit: 0.5, actualCredit: 0.5, type: CourseType.Compulsory, category: CourseCategory.SecondClass, subCategory: '第二课堂', module: '劳动教育', semester: '2-2', prerequisites: [], graduationReqs: [] },
  { id: '100011360023', code: '100011360023', name: '劳动 1-3', credit: 0.5, actualCredit: 0.5, type: CourseType.Compulsory, category: CourseCategory.SecondClass, subCategory: '第二课堂', module: '劳动教育', semester: '3-2', prerequisites: [], graduationReqs: [] },
  { id: '100011260020_LOGISTICS', code: '100011260020', name: '劳动 2 (后勤)', credit: 0.5, actualCredit: 0.5, type: CourseType.Elective, category: CourseCategory.SecondClass, subCategory: '第二课堂', module: '劳动教育', semester: 'Any', prerequisites: [], graduationReqs: [] },
  { id: '100011260020_OFFCAMPUS', code: '100011260020', name: '劳动 2 (校外)', credit: 0.5, actualCredit: 0.5, type: CourseType.Elective, category: CourseCategory.SecondClass, subCategory: '第二课堂', module: '劳动教育', semester: 'Any', prerequisites: [], graduationReqs: [] },
  { id: '100011260020_CAMPUS', code: '100011260020', name: '劳动 2 (校园)', credit: 0.5, actualCredit: 0.5, type: CourseType.Elective, category: CourseCategory.SecondClass, subCategory: '第二课堂', module: '劳动教育', semester: 'Any', prerequisites: [], graduationReqs: [] },
  // Extracurricular
  { id: '100011260040', code: '100011260040', name: '讲座', credit: 0.5, actualCredit: 0.5, type: CourseType.Elective, category: CourseCategory.SecondClass, subCategory: '第二课堂', module: '讲座、社团活动', semester: 'Any', prerequisites: [], graduationReqs: [] },
  { id: '100010660030', code: '100010660030', name: '社团活动', credit: 1, actualCredit: 1, type: CourseType.Elective, category: CourseCategory.SecondClass, subCategory: '第二课堂', module: '讲座、社团活动', semester: 'Any', prerequisites: [], graduationReqs: [] },

  // ==========================================
  // 3. 全校通识类课程 (Copied from previous turn, just ensuring existence)
  // ==========================================

  // 马克思主义与中国社会主义新时代 (四史)
  { id: '100000010631', code: '100000010631', name: '马克思美学与中国传统文化', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.GeneralEducation, subCategory: '马克思主义与中国社会主义新时代', semester: '1-1, 1-2', tags: ['four_histories'], graduationReqs: [], prerequisites: [] },
  { id: '100032510010', code: '100032510010', name: '社会主义发展史', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.GeneralEducation, subCategory: '马克思主义与中国社会主义新时代', semester: '1-2', tags: ['four_histories'], isCore: true, graduationReqs: [], prerequisites: [] },
  { id: '100032510020', code: '100032510020', name: '中共党史', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.GeneralEducation, subCategory: '马克思主义与中国社会主义新时代', semester: '1-2', tags: ['four_histories'], isCore: true, graduationReqs: [], prerequisites: [] },
  { id: '100032510030', code: '100032510030', name: '中国改革开放史', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.GeneralEducation, subCategory: '马克思主义与中国社会主义新时代', semester: '1-1', tags: ['four_histories'], isCore: true, graduationReqs: [], prerequisites: [] },
  { id: '100032510040', code: '100032510040', name: '中华人民共和国史', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.GeneralEducation, subCategory: '马克思主义与中国社会主义新时代', semester: '1-1', tags: ['four_histories'], isCore: true, graduationReqs: [], prerequisites: [] },
  
  // 人文社会 (Selected samples)
  { id: '100000010010', code: '100000010010', name: '人类文明史', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.GeneralEducation, subCategory: '人文社会', semester: '1-1, 1-2', isCore: true, graduationReqs: [], prerequisites: [] },
  { id: '100000010080', code: '100000010080', name: '经济学原理', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.GeneralEducation, subCategory: '人文社会', semester: '1-1, 1-2, 1-3', isCore: true, tags: ['eng_required'], graduationReqs: [], prerequisites: [] },
  { id: '100030110010', code: '100030110010', name: '现代工程导论', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.GeneralEducation, subCategory: '人文社会', semester: '1-1, 1-2', isCore: true, tags: ['eng_required'], graduationReqs: [], prerequisites: [] },
  
  // 艺术美育 (Selected samples)
  { id: '100000010200', code: '100000010200', name: '艺术与审美', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.GeneralEducation, subCategory: '艺术美育', semester: '1-1, 1-2', isCore: true, tags: ['art'], graduationReqs: [], prerequisites: [] },
  { id: '100000010250', code: '100000010250', name: '美学原理', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.GeneralEducation, subCategory: '艺术美育', semester: '1-1, 1-2, 1-3', tags: ['art'], graduationReqs: [], prerequisites: [] },

  // 公共选修 (Selected samples)
  { id: '100051750190', code: '100051750190', name: 'Python 语言程序设计', credit: 2, actualCredit: 2, type: CourseType.Elective, category: CourseCategory.PublicElective, subCategory: '公共选修', semester: '1-1', graduationReqs: [], prerequisites: [] },

];

// Define precise rules based on the spreadsheet headers
export const GRADUATION_REQUIREMENTS: RequirementRule[] = [
  // Top Level
  { id: 'total', name: '总学分', requiredCredits: 160, description: "毕业最低要求 (不含第二课堂)" },

  // Public Basic
  { id: 'politics', name: '思想政治类', requiredCredits: 18, category: CourseCategory.PublicBasic, subCategory: '思想政治类', type: CourseType.Compulsory, description: "16+2 学分" },
  { id: 'military', name: '军事体育类', requiredCredits: 8, category: CourseCategory.PublicBasic, subCategory: '军事体育类', type: CourseType.Compulsory },
  { 
    id: 'gen_elective', 
    name: '通识类 (选修)', 
    requiredCredits: 6, 
    category: CourseCategory.GeneralEducation,
    description: "选修6学分，含四史/美育/核心",
    // This allows it to show up in the Major view's sidebar logic if we want, or just relying on the category total
    customValue: (selectedIds: Set<string>, courses: Course[]) => {
      return courses.filter(c => selectedIds.has(c.id) && (c.category === CourseCategory.GeneralEducation || c.category === CourseCategory.GeneralOnline))
                    .reduce((sum, c) => sum + c.actualCredit, 0);
    }
  },
  { id: 'foreign', name: '外语类', requiredCredits: 8, category: CourseCategory.PublicBasic, subCategory: '外语类', type: CourseType.Compulsory },
  { id: 'math', name: '数学与自然科学类', requiredCredits: 32, category: CourseCategory.PublicBasic, subCategory: '数学与自然科学类', type: CourseType.Compulsory },
  
  // Professional
  { id: 'computer', name: '计算机类', requiredCredits: 3, category: CourseCategory.ProfessionalClass, subCategory: '计算机类', type: CourseType.Compulsory },
  { id: 'disciplinary', name: '学科与大类基础', requiredCredits: 12, category: CourseCategory.ProfessionalClass, subCategory: '学科与大类基础课程', type: CourseType.Compulsory },
  { id: 'prof_basic', name: '专业基础课程', requiredCredits: 15, category: CourseCategory.ProfessionalClass, subCategory: '专业基础课程', type: CourseType.Compulsory },
  { id: 'prof_core', name: '专业主干必修', requiredCredits: 6, category: CourseCategory.ProfessionalClass, subCategory: '专业主干必修课程', type: CourseType.Compulsory },
  { id: 'prof_elec', name: '专业方向选修模块', requiredCredits: 12, category: CourseCategory.ProfessionalClass, subCategory: '专业方向选修模块', type: CourseType.Elective, description: "含模块一至四" },

  // Practice
  { id: 'practice_comp', name: '专业实验/实习', requiredCredits: 20, category: CourseCategory.Practice, subCategory: '专业实验、实习等(必修)', type: CourseType.Compulsory },
  { id: 'practice_elec', name: '实践课选修模块', requiredCredits: 5, category: CourseCategory.Practice, subCategory: '实践课选修模块', type: CourseType.Elective },
  { id: 'grad_design', name: '毕业设计', requiredCredits: 15, category: CourseCategory.Practice, subCategory: '毕业设计(论文)', type: CourseType.Compulsory },

  // Innovation & Second Class
  { id: 'innovation', name: '创新创业教育', requiredCredits: 2, category: CourseCategory.Innovation },
  { 
    id: 'second_class', 
    name: '第二课堂 (不计入总分)', 
    requiredCredits: 8, 
    category: CourseCategory.SecondClass, 
    description: "必修8学分",
    customValue: (selectedIds: Set<string>, courses: Course[]) => {
      // Simple sum of selected second class courses
      return courses.filter(c => selectedIds.has(c.id) && c.category === CourseCategory.SecondClass)
                    .reduce((sum, c) => sum + c.actualCredit, 0);
    }
  },
  
  // Specific checks for Gen Ed (shown in Gen Ed tab or sidebar details)
  { 
    id: 'gen_four_history', 
    name: '四史课(必选1门)', 
    requiredCount: 1, 
    category: CourseCategory.GeneralEducation,
    customCheck: (selectedIds: Set<string>, courses: Course[]) => courses.some(c => selectedIds.has(c.id) && c.tags?.includes('four_histories'))
  },
  { 
    id: 'gen_art', 
    name: '美育类(必选1门)', 
    requiredCount: 1, 
    category: CourseCategory.GeneralEducation,
    customCheck: (selectedIds: Set<string>, courses: Course[]) => courses.some(c => selectedIds.has(c.id) && c.tags?.includes('art'))
  },
  { 
    id: 'gen_core', 
    name: '核心课程(至少1门)', 
    requiredCount: 1, 
    category: CourseCategory.GeneralEducation,
    customCheck: (selectedIds: Set<string>, courses: Course[]) => courses.some(c => selectedIds.has(c.id) && c.isCore)
  },
  { 
    id: 'gen_eng_req', 
    name: '工科必选(经原/工导)', 
    requiredCount: 1, 
    category: CourseCategory.GeneralEducation,
    description: "经济学原理或现代工程导论",
    customCheck: (selectedIds: Set<string>, courses: Course[]) => courses.some(c => selectedIds.has(c.id) && c.tags?.includes('eng_required'))
  },
];

export const ALL_SEMESTERS = ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3', '4-1', '4-2', '假期', 'Any', '1,2,3'];

export const REQ_DESCRIPTIONS = {
  1: "工程知识",
  2: "问题分析",
  3: "设计/开发解决方案",
  4: "研究",
  5: "使用现代工具",
  6: "工程与社会",
  7: "环境和可持续发展",
  8: "职业规范",
  9: "个人和团队",
  10: "沟通",
  11: "项目管理",
  12: "终身学习",
  13: "核心价值观"
};