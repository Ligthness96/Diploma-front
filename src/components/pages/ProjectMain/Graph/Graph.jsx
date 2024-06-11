import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Graph from 'react-vis-network-graph';
import styles from "./GraphPage.module.css";
import { fetchTasks } from '../../../../redux/slices/tasks';
import { createEdge } from '../../../../redux/slices/edge';
import { deleteEdge } from '../../../../redux/slices/edge';
import { fetchEdges } from '../../../../redux/slices/edges';

export default function GraphPage({ show }) {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.tasks);
  const { edgesss } = useSelector(state => state.edgesss);

  const [physic, setPhysic] = useState(false);
  const [nodes, setNodes] = useState(null);
  const [edges, setEdges] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [secondSelectedNode, setSecondSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks({ projectid: window.localStorage.getItem("projectid") }));
    dispatch(fetchEdges({ projectid: window.localStorage.getItem("projectid") }));
    
    const jsonNodes = JSON.parse(JSON.stringify({
      nodes: tasks.items.map(obj => ({
        id: obj.taskid,
        label: obj.taskname,
        color: obj.iscomplete ? "lightgreen" : 'lightblue'
      }))
    })).nodes;
    setNodes(jsonNodes);

    const jsonEdges = JSON.parse(JSON.stringify({
      edges: edgesss.items.map(obj => ({
        from: obj.edgefrom,
        to: obj.edgeto
      }))
    })).edges;
    setEdges(jsonEdges);
  }, [show]);

  const graph = {
    nodes: nodes,
    edges: edges
  };

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000",
      length: 250
    },
    nodes: {
      shape: 'box',
      margin: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
      }
    },
    physics: physic
  };

  const handleAddEdge = () => {
    if (selectedNode !== null && secondSelectedNode !== null) {
      setEdges([...edges, { from: selectedNode, to: secondSelectedNode }]);
      dispatch(createEdge({
        projectid: window.localStorage.getItem("projectid"),
        taskid: selectedNode,
        edgefrom: selectedNode,
        edgeto: secondSelectedNode
      }));
      setSelectedNode(null);
      setSecondSelectedNode(null);
      setSelectedEdge(null);
    }
  };

  const handleDeleteEdge = () => {
    if (selectedEdge !== null) {
      const newEdges = edges.filter(edge => !(edge.from === selectedEdge.from && edge.to === selectedEdge.to));
      setEdges(newEdges);
      dispatch(deleteEdge({ edgefrom: selectedEdge.from, edgeto: selectedEdge.to }));
      setSelectedNode(null);
      setSecondSelectedNode(null);
      setSelectedEdge(null);
    }
  };

  const handleAddEdgeCancel = () => {
    setSelectedNode(null);
    setSecondSelectedNode(null);
    setSelectedEdge(null);
  };

  const selectNode = (event) => {
    const node = event.nodes[0];
    if (selectedNode === null) {
      setSelectedNode(node);
    } else if (secondSelectedNode === null) {
      setSecondSelectedNode(node);
    }
  };

  const selectEdge = (event) => {
    const selectedEdgeId = event.edges[0];
    const edgeToDelete = edges.find(edge => edge.id === selectedEdgeId);
    setSelectedEdge(edgeToDelete);
  };

  const events = {
    selectNode,
    selectEdge
  };

  if (show) {
    return (
      <div className={styles.content}>
        <Graph
          className={styles.graph}
          graph={graph}
          options={options}
          events={events}
        />
        <div className={styles.controlPanel}>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleAddEdge}>Добавить</button>
            <button className={styles.button} onClick={handleDeleteEdge}>Удалить</button>
            <button className={styles.button} onClick={handleAddEdgeCancel}>Отменить</button>
            <button className={styles.button} onClick={() => setPhysic(!physic)}>Физика: {physic ? 'ON' : 'OFF'}</button>
          </div>
          <div className={styles.texts}>
            {selectedNode && <p>1 узел выбран</p>}
            {secondSelectedNode && <p>2 узел выбран</p>}
            {selectedEdge && <p>Ребро выбрано</p>}
          </div>
        </div>
      </div>
    );
  }
  return null;
}