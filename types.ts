export enum CourseType {
  Compulsory = '必修',
  Elective = '选修',
}

export enum CourseCategory {
  PublicBasic = '公共基础与通识课程',
  ProfessionalClass = '大类、专业基础类与专业类课程',
  Practice = '专业实践与毕业设计(论文)',
  Innovation = '创新创业教育',
  SecondClass = '第二课堂',
  Honors = '专创融合荣誉课程',
  // New Categories for General Ed
  GeneralEducation = '全校通识类课程',
  GeneralOnline = '网络通识课程',
  PublicElective = '全校公共选修课程'
}

export interface Course {
  id: string;
  code: string; // 课程编号
  name: string; // 课程名称
  credit: number | string; // 学分 (String allowed for ranges like "2-3" or special cases)
  actualCredit: number; // Numeric value for calculation
  type: CourseType; // 属性
  category: CourseCategory; // 顶级类别
  subCategory: string; // 二级类别
  module?: string; // 三级模块
  semester: string; // 建议修读学期
  prerequisites: string[]; // 先修课程 IDs
  graduationReqs: number[]; // 对应毕业要求
  description?: string;
  isPractice?: boolean; // Helper for practice courses
  isCore?: boolean; // 是否核心课程 (★)
  tags?: string[]; // 特殊标记: 'four_histories', 'art', 'eng_required'
}

export interface RequirementRule {
  id: string;
  name: string;
  requiredCredits?: number;
  requiredCount?: number; // Check for number of courses instead of credits
  category?: CourseCategory;
  subCategory?: string; // If set, strictly filter by this
  type?: CourseType; // If set, strictly filter by this
  description?: string;
  customCheck?: (selectedIds: Set<string>, courses: Course[]) => boolean; // Custom logic returns pass/fail
  customValue?: (selectedIds: Set<string>, courses: Course[]) => number; // Custom logic returns current value for progress
}

export interface UserState {
  selectedCourseIds: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  className?: string;
  grade?: string;
  selectedIds: string[];
}