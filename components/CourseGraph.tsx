import React, { useEffect, useMemo } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  Position, 
  MarkerType, 
  useNodesState, 
  useEdgesState,
  Background,
  Controls
} from 'reactflow';
import { Course } from '../types';

interface CourseGraphProps {
  selectedCourseId: string | null;
  allCourses: Course[];
  userSelectedIds: string[];
}

const CourseGraph: React.FC<CourseGraphProps> = ({ selectedCourseId, allCourses, userSelectedIds }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!selectedCourseId) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const centerCourse = allCourses.find(c => c.id === selectedCourseId);
    if (!centerCourse) return;

    // Identify related courses
    const parents = allCourses.filter(c => centerCourse.prerequisites.includes(c.id));
    const children = allCourses.filter(c => c.prerequisites.includes(centerCourse.id));

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    const NODE_WIDTH = 150;
    const NODE_HEIGHT = 50;
    const GAP_X = 200;
    const GAP_Y = 80;

    // Helper to check status
    const getStatusStyle = (courseId: string, isCenter: boolean = false) => {
      if (isCenter) {
        return {
          background: '#eff6ff', // blue-50
          border: '2px solid #2563eb', // blue-600
          color: '#1e3a8a',
        };
      }
      const isSelected = userSelectedIds.includes(courseId);
      if (isSelected) {
        return {
          background: '#ecfdf5', // green-50
          border: '1px solid #10b981', // green-500
          color: '#064e3b',
        };
      } else {
        return {
          background: '#fff1f2', // red-50
          border: '1px dashed #f43f5e', // red-500
          color: '#881337',
        };
      }
    };

    // --- Center Node ---
    newNodes.push({
      id: centerCourse.id,
      data: { label: centerCourse.name },
      position: { x: GAP_X + NODE_WIDTH / 2, y: Math.max(parents.length, children.length, 1) * GAP_Y / 2 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: getStatusStyle(centerCourse.id, true),
    });

    // --- Parent Nodes (Left) ---
    const parentStartY = (Math.max(parents.length, children.length, 1) * GAP_Y / 2) - ((parents.length - 1) * GAP_Y) / 2;
    
    parents.forEach((parent, index) => {
      newNodes.push({
        id: parent.id,
        data: { label: parent.name },
        position: { x: 0, y: parentStartY + index * GAP_Y },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: getStatusStyle(parent.id),
      });

      newEdges.push({
        id: `e-${parent.id}-${centerCourse.id}`,
        source: parent.id,
        target: centerCourse.id,
        markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
        style: { stroke: '#94a3b8', strokeWidth: 1.5 },
        animated: false,
      });
    });

    // --- Child Nodes (Right) ---
    const childStartY = (Math.max(parents.length, children.length, 1) * GAP_Y / 2) - ((children.length - 1) * GAP_Y) / 2;

    children.forEach((child, index) => {
      newNodes.push({
        id: child.id,
        data: { label: child.name },
        position: { x: (GAP_X + NODE_WIDTH) * 2 - NODE_WIDTH, y: childStartY + index * GAP_Y },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: getStatusStyle(child.id),
      });

      newEdges.push({
        id: `e-${centerCourse.id}-${child.id}`,
        source: centerCourse.id,
        target: child.id,
        markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
        style: { stroke: '#94a3b8', strokeWidth: 1.5 },
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [selectedCourseId, allCourses, userSelectedIds, setNodes, setEdges]);

  if (!selectedCourseId) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-sm">
        请在列表中选择一门课程以查看先修关系
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-bold text-gray-700 mb-2 border-b pb-2">先修关系拓扑 (React Flow)</h3>
      <div className="border border-gray-100 rounded bg-slate-50 overflow-hidden h-[300px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          attributionPosition="bottom-right"
        >
          <Background color="#e2e8f0" gap={16} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500 justify-center">
         <div className="flex items-center"><span className="w-2 h-2 rounded bg-rose-50 border border-rose-500 border-dashed mr-1"></span>未修先修课</div>
         <div className="flex items-center"><span className="w-2 h-2 rounded bg-emerald-50 border border-emerald-500 mr-1"></span>已修/计划</div>
         <div className="flex items-center"><span className="w-2 h-2 rounded bg-blue-50 border border-blue-600 mr-1"></span>当前课程</div>
      </div>
    </div>
  );
};

export default CourseGraph;