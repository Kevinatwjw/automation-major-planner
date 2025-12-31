import React, { useState, useEffect, useMemo } from 'react';
import { COURSES, GRADUATION_REQUIREMENTS, ALL_SEMESTERS, REQ_DESCRIPTIONS } from './data';
import { Course, CourseType, CourseCategory, RequirementRule, StudentProfile } from './types';
import CourseGraph from './components/CourseGraph';

// Admin Credentials (hardcoded as requested)
const ADMIN_USER = 'wjw';
const ADMIN_PASS = 'wjw20031002';

interface DB {
  students: Record<string, StudentProfile>;
}

const App: React.FC = () => {
  // --- Auth State ---
  const [db, setDb] = useState<DB>({ students: {} });
  const [currentUser, setCurrentUser] = useState<{ id: string, name: string, isAdmin: boolean } | null>(null);
  const [authView, setAuthView] = useState<'student' | 'admin'>('student');
  
  // Login Form State
  const [loginId, setLoginId] = useState('');
  const [loginName, setLoginName] = useState('');
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- Planner State ---
  // If admin, this points to the student currently being viewed
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  
  // View Mode State
  const [viewMode, setViewMode] = useState<'major' | 'general'>('major');
  
  // Filters
  const [filterSem, setFilterSem] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'graph' | 'matrix'>('graph');

  // --- Initialization & DB ---
  useEffect(() => {
    const savedDb = localStorage.getItem('automation_planner_db');
    if (savedDb) {
      try {
        setDb(JSON.parse(savedDb));
      } catch (e) {
        console.error("Failed to parse DB", e);
      }
    }
  }, []);

  // Persist DB whenever it changes
  useEffect(() => {
    if (Object.keys(db.students).length > 0) {
      localStorage.setItem('automation_planner_db', JSON.stringify(db));
    }
  }, [db]);

  // Sync selectedIds from DB when switching viewed student
  useEffect(() => {
    if (viewingStudentId && db.students[viewingStudentId]) {
      setSelectedIds(new Set(db.students[viewingStudentId].selectedIds));
    } else {
      setSelectedIds(new Set());
    }
  }, [viewingStudentId]); // Intentionally not depending on DB to avoid loops, only when ID switches

  // Save selectedIds to DB when they change (if a student is active)
  const handleSelectionChange = (newSet: Set<string>) => {
    setSelectedIds(newSet);
    if (viewingStudentId) {
      setDb(prev => ({
        ...prev,
        students: {
          ...prev.students,
          [viewingStudentId]: {
            ...prev.students[viewingStudentId],
            selectedIds: Array.from(newSet)
          }
        }
      }));
    }
  };

  // --- Auth Handlers ---
  const handleStudentLogin = () => {
    if (!loginId) {
      setLoginError('请输入学号');
      return;
    }
    
    let student = db.students[loginId];
    if (!student) {
      if (!loginName) {
        setLoginError('新用户请填写姓名');
        return;
      }
      // Register new
      student = { id: loginId, name: loginName, selectedIds: [] };
      setDb(prev => ({ ...prev, students: { ...prev.students, [loginId]: student! } }));
    }

    setCurrentUser({ id: student.id, name: student.name, isAdmin: false });
    setViewingStudentId(student.id);
    setLoginError('');
  };

  const handleAdminLogin = () => {
    if (adminUser === ADMIN_USER && adminPass === ADMIN_PASS) {
      setCurrentUser({ id: 'admin', name: '管理员', isAdmin: true });
      setViewingStudentId(null); // Admin starts by selecting a student
      setLoginError('');
    } else {
      setLoginError('账号或密码错误');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewingStudentId(null);
    setLoginId('');
    setLoginName('');
    setAdminPass('');
    setLoginError('');
  };

  // --- Planner Handlers ---
  const toggleCourse = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    handleSelectionChange(newSet);
  };

  const clearAll = () => {
    if(confirm('确定要清空当前方案吗？')) {
      handleSelectionChange(new Set());
    }
  };

  // Derived Data: Calculations
  const stats = useMemo(() => {
    const selectedCourses = COURSES.filter(c => selectedIds.has(c.id));
    
    // Total credits (Excluding Second Class and Honors)
    const validCoursesForTotal = selectedCourses.filter(c => 
        c.category !== CourseCategory.SecondClass && c.category !== CourseCategory.Honors
    );
    const totalCredits = validCoursesForTotal.reduce((sum, c) => sum + c.actualCredit, 0);
    
    // Credits by SubCategory map
    const creditsBySubCategory: Record<string, number> = {};
    const creditsByCategory: Record<string, number> = {};
    
    selectedCourses.forEach(c => {
      // Subcategory
      const subKey = c.subCategory;
      creditsBySubCategory[subKey] = (creditsBySubCategory[subKey] || 0) + c.actualCredit;
      
      // Category (Top level)
      const catKey = c.category;
      creditsByCategory[catKey] = (creditsByCategory[catKey] || 0) + c.actualCredit;
    });

    return { totalCredits, creditsBySubCategory, creditsByCategory };
  }, [selectedIds]);

  // Derived Data: Grouped List
  const groupedCourses = useMemo(() => {
    // 1. Filter based on View Mode and Dropdowns
    const filtered = COURSES.filter(c => {
      // View Mode Filter
      if (viewMode === 'major') {
        // Show Major Categories
        const majorCats = [
            CourseCategory.PublicBasic, 
            CourseCategory.ProfessionalClass, 
            CourseCategory.Practice, 
            CourseCategory.Innovation, // In Major view as well
            CourseCategory.SecondClass
        ];
        if (!majorCats.includes(c.category)) return false;
      } else {
        // Show General Categories
        const generalCats = [
            CourseCategory.GeneralEducation, 
            CourseCategory.GeneralOnline, 
            CourseCategory.Innovation, // Added here as requested ("displayed in General Education")
            CourseCategory.PublicElective
        ];
        if (!generalCats.includes(c.category)) return false;
      }

      if (filterSem !== 'all' && !c.semester.includes(filterSem)) return false;
      if (filterCategory !== 'all' && c.category !== filterCategory) return false;
      return true;
    });

    // 2. Group by Category -> SubCategory -> Module
    const groups: Record<string, Record<string, Record<string, Course[]>>> = {};

    filtered.forEach(c => {
      if (!groups[c.category]) groups[c.category] = {};
      if (!groups[c.category][c.subCategory]) groups[c.category][c.subCategory] = {};
      const modName = c.module || '默认';
      if (!groups[c.category][c.subCategory][modName]) groups[c.category][c.subCategory][modName] = [];
      groups[c.category][c.subCategory][modName].push(c);
    });

    return groups;
  }, [filterSem, filterCategory, viewMode]);

  const activeCourse = COURSES.find(c => c.id === activeCourseId);

  // Helper to render a requirement check
  const renderRequirement = (req: RequirementRule) => {
    let current = 0;
    let target = req.requiredCredits || req.requiredCount || 0;
    let isMet = false;

    if (req.customValue) {
        current = req.customValue(selectedIds, COURSES);
        isMet = current >= target;
    } else if (req.customCheck) {
        isMet = req.customCheck(selectedIds, COURSES);
        current = isMet ? target : 0; 
    } else {
        if (req.subCategory) {
            current = stats.creditsBySubCategory[req.subCategory] || 0;
        } else if (req.category) {
            current = stats.creditsByCategory[req.category] || 0;
        }
        isMet = current >= target;
    }

    const percent = Math.min((current / target) * 100, 100);

    return (
        <div key={req.id} className="text-xs mb-3">
            <div className="flex justify-between mb-1">
            <span className="text-slate-700 font-medium truncate pr-2 flex items-center" title={req.name}>
               {isMet && <span className="text-success mr-1">✓</span>}
               {req.name}
            </span>
            <span className={isMet ? 'text-success font-bold' : 'text-slate-500'}>
                {req.customCheck ? (isMet ? '已满足' : '未满足') : `${current}/${target}`}
            </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
            <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${isMet ? 'bg-success' : 'bg-warning'}`} 
                style={{ width: `${percent}%` }}>
            </div>
            </div>
            {req.description && <div className="text-[10px] text-slate-400">{req.description}</div>}
        </div>
    );
  };

  // --- RENDER LOGIN ---
  if (!currentUser) {
    return (
      <div className="h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-primary mb-6">自动化专业选课规划系统</h1>
          
          <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${authView === 'student' ? 'bg-white shadow text-primary' : 'text-slate-500'}`}
              onClick={() => { setAuthView('student'); setLoginError(''); }}
            >
              学生登录/注册
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${authView === 'admin' ? 'bg-white shadow text-primary' : 'text-slate-500'}`}
              onClick={() => { setAuthView('admin'); setLoginError(''); }}
            >
              管理员登录
            </button>
          </div>

          {authView === 'student' && (
            <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">学号</label>
                 <input 
                   type="text" 
                   value={loginId} 
                   onChange={e => setLoginId(e.target.value)} 
                   className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                   placeholder="例如: 20221071389"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">姓名 {db.students[loginId] ? <span className="text-xs text-green-600 font-normal">(已存在)</span> : <span className="text-xs text-blue-600 font-normal">(新用户必填)</span>}</label>
                 <input 
                   type="text" 
                   value={loginName} 
                   onChange={e => setLoginName(e.target.value)}
                   disabled={!!db.students[loginId]} // Disable name edit if user exists
                   className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-50"
                   placeholder={!!db.students[loginId] ? db.students[loginId].name : "例如: 王俊伟"}
                 />
               </div>
               <button onClick={handleStudentLogin} className="w-full py-2 bg-primary text-white rounded font-bold hover:bg-blue-700 transition">
                 {db.students[loginId] ? '进入系统' : '注册并进入'}
               </button>
            </div>
          )}

          {authView === 'admin' && (
            <div className="space-y-4">
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">管理员账号</label>
                 <input 
                   type="text" 
                   value={adminUser} 
                   onChange={e => setAdminUser(e.target.value)}
                   className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">密码</label>
                 <input 
                   type="password" 
                   value={adminPass} 
                   onChange={e => setAdminPass(e.target.value)}
                   className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                 />
               </div>
               <button onClick={handleAdminLogin} className="w-full py-2 bg-slate-800 text-white rounded font-bold hover:bg-slate-700 transition">
                 管理员登录
               </button>
            </div>
          )}

          {loginError && <div className="mt-4 text-sm text-red-500 text-center">{loginError}</div>}
        </div>
      </div>
    );
  }

  // --- RENDER PLANNER ---
  return (
    <div className="flex flex-col h-screen overflow-hidden text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-primary text-white px-4 py-3 shadow-md flex justify-between items-center z-20 shrink-0">
        <div>
          <h1 className="text-xl font-bold tracking-wide">自动化专业交互式培养方案</h1>
          <div className="flex gap-4 mt-1 text-xs text-blue-200">
             <span>当前用户: {currentUser.name} {currentUser.isAdmin && '(管理员)'}</span>
             {viewingStudentId && currentUser.isAdmin && (
               <span className="bg-yellow-500/20 px-1 rounded text-yellow-200">正在查看: {db.students[viewingStudentId]?.name} ({viewingStudentId})</span>
             )}
          </div>
        </div>
        
        {/* Admin Student Switcher */}
        {currentUser.isAdmin && (
          <div className="flex items-center gap-2">
            <select 
               className="bg-blue-800 text-white text-xs border border-blue-600 rounded px-2 py-1 outline-none"
               value={viewingStudentId || ''}
               onChange={e => setViewingStudentId(e.target.value)}
            >
              <option value="" disabled>选择学生查看...</option>
              {Object.values(db.students).map(s => (
                <option key={s.id} value={s.id}>{s.id} - {s.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* View Switcher (Only show if a student is selected) */}
        {viewingStudentId && (
          <div className="flex bg-blue-800/50 p-1 rounded-lg mx-4">
             <button 
               onClick={() => setViewMode('major')}
               className={`px-4 py-1.5 text-sm rounded-md transition ${viewMode === 'major' ? 'bg-white text-primary font-bold shadow' : 'text-blue-100 hover:bg-blue-700/50'}`}
             >
               专业培养方案
             </button>
             <button 
               onClick={() => setViewMode('general')}
               className={`px-4 py-1.5 text-sm rounded-md transition ${viewMode === 'general' ? 'bg-white text-primary font-bold shadow' : 'text-blue-100 hover:bg-blue-700/50'}`}
             >
               全校通识与选修
             </button>
          </div>
        )}

        <div className="text-sm flex gap-2">
          {viewingStudentId && (
            <button onClick={clearAll} className="bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded transition text-xs">重置方案</button>
          )}
          <button onClick={handleLogout} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition text-xs">退出登录</button>
        </div>
      </header>

      {/* Main Layout - Only if Viewing Student */}
      {!viewingStudentId ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 text-slate-400">
           <div className="text-4xl mb-4">👥</div>
           <p>请在上方选择一个学生以查看和修改其培养方案</p>
        </div>
      ) : (
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar: Stats & Check */}
        <aside className="w-80 bg-white border-r border-slate-200 flex flex-col overflow-y-auto z-10 shadow-sm shrink-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50 sticky top-0">
             <div className="mb-2">
                <div className="flex justify-between text-base mb-1 items-end">
                  <span className="font-bold text-slate-800">总学分进度</span>
                  <span className={`text-lg font-mono font-bold ${stats.totalCredits >= 160 ? 'text-success' : 'text-primary'}`}>
                    {stats.totalCredits} / 160
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${stats.totalCredits >= 160 ? 'bg-success' : 'bg-primary'}`} 
                    style={{ width: `${Math.min((stats.totalCredits / 160) * 100, 100)}%` }}>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 text-right mt-1">*不含第二课堂</div>
             </div>
          </div>

          <div className="p-4 space-y-6">
             {viewMode === 'major' ? (
                 <>
                    {[
                      CourseCategory.PublicBasic, 
                      CourseCategory.ProfessionalClass, 
                      CourseCategory.Practice, 
                      CourseCategory.Innovation, // Added here
                      CourseCategory.SecondClass
                    ].map(cat => {
                        const reqs = GRADUATION_REQUIREMENTS.filter(r => r.category === cat);
                        if (reqs.length === 0) return null;
                        return (
                            <div key={cat} className="space-y-1">
                                <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider border-b pb-1 mb-2">{cat}</h3>
                                {reqs.map(renderRequirement)}
                            </div>
                        );
                    })}
                 </>
             ) : (
                 <>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4 text-xs text-blue-800">
                        <strong>通识选修说明：</strong><br/>
                        需选修至少6学分。含“四史”1门、美育1门、核心(★)1门。工科学生需选《经济学原理》或《现代工程导论》。
                        <br/><br/>
                        <strong>创新创业教育说明：</strong><br/>
                        需选修至少2学分。
                    </div>
                    {[CourseCategory.GeneralEducation, CourseCategory.Innovation].map(cat => {
                        const reqs = GRADUATION_REQUIREMENTS.filter(r => r.category === cat);
                        if (reqs.length === 0) return null;
                        return (
                            <div key={cat} className="space-y-1">
                                <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider border-b pb-1 mb-2">{cat}</h3>
                                {reqs.map(renderRequirement)}
                            </div>
                        );
                    })}
                 </>
             )}
          </div>
        </aside>

        {/* Center: Course List */}
        <main className="flex-1 bg-slate-100 flex flex-col min-w-0">
          {/* Filters */}
          <div className="bg-white p-3 border-b border-slate-200 flex gap-3 flex-wrap shadow-sm z-10 items-center shrink-0">
             <label className="text-xs font-bold text-slate-500">筛选:</label>
             <select 
               className="border border-slate-300 rounded px-2 py-1 text-sm bg-white hover:border-blue-500 focus:outline-none max-w-[200px]"
               value={filterCategory}
               onChange={e => setFilterCategory(e.target.value)}
             >
               <option value="all">所有课程类别</option>
               {Object.values(CourseCategory).map(c => <option key={c} value={c}>{c}</option>)}
             </select>
             <select 
               className="border border-slate-300 rounded px-2 py-1 text-sm bg-white hover:border-blue-500 focus:outline-none"
               value={filterSem}
               onChange={e => setFilterSem(e.target.value)}
             >
               <option value="all">所有学期</option>
               {ALL_SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
             </select>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {Object.keys(groupedCourses).length === 0 && (
                <div className="text-center p-10 text-slate-400">无符合条件的课程</div>
            )}

            {Object.entries(groupedCourses).map(([catName, subCats]) => (
              <div key={catName} className="bg-white rounded-lg shadow-sm ring-1 ring-slate-900/5 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-primary rounded-full"></span>
                  {catName}
                </div>
                
                {Object.entries(subCats).map(([subCatName, modules]) => (
                  <div key={subCatName} className="border-b border-slate-100 last:border-0">
                    <div className="bg-slate-50/50 px-4 py-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide">
                      {subCatName}
                    </div>
                    
                    {Object.entries(modules).map(([moduleName, courses]) => (
                      <div key={moduleName}>
                        {moduleName !== '默认' && (
                          <div className="px-4 py-1 text-xs text-blue-600 font-medium bg-blue-50 border-l-4 border-blue-200 pl-3">
                            {moduleName}
                          </div>
                        )}
                        <table className="w-full text-sm text-left">
                          <tbody className="divide-y divide-slate-100">
                            {courses.map(course => {
                              const isSelected = selectedIds.has(course.id);
                              const isActive = activeCourseId === course.id;
                              return (
                                <tr 
                                  key={course.id} 
                                  className={`hover:bg-blue-50 transition cursor-pointer ${isActive ? 'bg-blue-50' : ''}`}
                                  onClick={() => setActiveCourseId(course.id)}
                                >
                                  <td className="px-4 py-3 w-10 text-center" onClick={(e) => e.stopPropagation()}>
                                    <input 
                                      type="checkbox" 
                                      checked={isSelected} 
                                      onChange={() => toggleCourse(course.id)}
                                      className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary cursor-pointer accent-blue-600"
                                    />
                                  </td>
                                  <td className="px-4 py-3 font-mono text-xs text-slate-400 w-24">{course.code}</td>
                                  <td className="px-4 py-3 font-medium text-slate-900">
                                    {course.isCore && <span className="text-amber-500 mr-1" title="核心课程">★</span>}
                                    {course.name}
                                    {course.type === CourseType.Elective && (
                                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-normal">选</span>
                                    )}
                                     {course.type === CourseType.Compulsory && (
                                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-normal">必</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 w-20 text-slate-600 font-semibold text-right">{course.credit}学分</td>
                                  <td className="px-4 py-3 w-24 text-slate-500 text-right">{course.semester}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar: Visuals */}
        <aside className="w-96 bg-white border-l border-slate-200 flex flex-col z-10 shadow-sm overflow-hidden shrink-0">
           <div className="flex border-b border-slate-200 shrink-0">
             <button 
               onClick={() => setActiveTab('graph')}
               className={`flex-1 py-3 text-sm font-medium transition ${activeTab === 'graph' ? 'text-primary border-b-2 border-primary bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
             >
               课程关系
             </button>
             <button 
               onClick={() => setActiveTab('matrix')}
               className={`flex-1 py-3 text-sm font-medium transition ${activeTab === 'matrix' ? 'text-primary border-b-2 border-primary bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
             >
               毕业要求
             </button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
             {activeCourse ? (
               <>
                 <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-slate-100">
                   <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                       {activeCourse.isCore && <span className="text-amber-500">★</span>}
                       {activeCourse.name}
                   </h3>
                   <div className="mt-2 grid grid-cols-2 gap-y-2 text-xs text-slate-500">
                     <div><span className="text-slate-400">代码:</span> {activeCourse.code}</div>
                     <div><span className="text-slate-400">学分:</span> {activeCourse.credit}</div>
                     <div><span className="text-slate-400">学期:</span> {activeCourse.semester}</div>
                     <div><span className="text-slate-400">属性:</span> {activeCourse.type}</div>
                     <div className="col-span-2"><span className="text-slate-400">类别:</span> {activeCourse.category} - {activeCourse.subCategory}</div>
                     {activeCourse.module && <div className="col-span-2 text-blue-600"><span className="text-slate-400 text-slate-500">模块:</span> {activeCourse.module}</div>}
                   </div>
                 </div>

                 {activeTab === 'graph' && (
                    <CourseGraph 
                      selectedCourseId={activeCourseId} 
                      allCourses={COURSES} 
                      userSelectedIds={Array.from(selectedIds)} 
                    />
                 )}

                 {activeTab === 'matrix' && (
                   <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="text-sm font-bold text-slate-700 mb-2">毕业要求指标点覆盖</h4>
                      
                      <div className="grid grid-cols-7 gap-1 mb-4">
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(reqNum => {
                           const supports = activeCourse.graduationReqs.includes(reqNum);
                           const isCourseSelected = selectedIds.has(activeCourse.id);
                           return (
                             <div 
                                key={reqNum}
                                className={`
                                  aspect-square flex items-center justify-center rounded text-xs font-bold border transition
                                  ${supports 
                                    ? (isCourseSelected ? 'bg-green-500 text-white border-green-600' : 'bg-green-100 text-green-700 border-green-300') 
                                    : 'bg-slate-50 text-slate-300 border-slate-100'}
                                `}
                                title={`要求 ${reqNum}: ${(REQ_DESCRIPTIONS as any)[reqNum]}`}
                             >
                               {reqNum}
                             </div>
                           );
                        })}
                      </div>
                      
                      <div className="text-xs space-y-2">
                         {activeCourse.graduationReqs.length > 0 ? activeCourse.graduationReqs.map(r => (
                           <div key={r} className="flex gap-2">
                             <span className="font-bold text-slate-700 whitespace-nowrap">要求 {r}:</span>
                             <span className="text-slate-600">{(REQ_DESCRIPTIONS as any)[r]}</span>
                           </div>
                         )) : (
                           <div className="text-slate-400 italic">此课程不直接对应具体的毕业要求指标点。</div>
                         )}
                      </div>
                   </div>
                 )}
               </>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-sm">请在左侧点击选择一门课程<br/>查看详情与可视化分析</p>
               </div>
             )}
           </div>
        </aside>

      </div>
      )}
    </div>
  );
};

export default App;