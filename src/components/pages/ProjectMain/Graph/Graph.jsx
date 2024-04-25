import { Typography } from '@mui/material';
import react, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Graph from 'react-vis-network-graph';
import styles from "./GraphPage.module.css"
import { fetchTasks } from '../../../../redux/slices/tasks';
import { createEdge } from '../../../../redux/slices/edge';
import { fetchEdges } from '../../../../redux/slices/edges';



export default function GraphPage({show}) {
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.tasks)
  const isTasksLoaded = tasks.status === 'loaded'

  const { edgesss } = useSelector(state => state.edgesss)
  const isEdgesLoaded = tasks.status === 'loaded'

  const [nodes, setNodes] = useState(null);
  const [edges, setEdges] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [secondSelectedNode, setSecondSelectedNode] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks({projectid: window.localStorage.getItem("projectid")}))
    dispatch(fetchEdges({projectid: window.localStorage.getItem("projectid")}))
    const jsonNodes = JSON.parse(JSON.stringify({nodes: tasks.items.map(obj => ({
       id: obj.taskid, 
       label: obj.taskname, 
       color: obj.iscomplete ? "lightgreen" : 'lightblue'}
       ))})).nodes;
    setNodes(jsonNodes)

    const jsonEdges = JSON.parse(JSON.stringify({edges: edgesss.items.map(obj => ({
      from: obj.edgefrom, 
      to: obj.edgeto
    }))})).edges;
    setEdges(jsonEdges);
  }, [show])  
  useEffect(() => {
    console.log(selectedNode, secondSelectedNode);
  }, [selectedNode, secondSelectedNode]);

  const graph = {
    nodes: nodes,
    edges: edges
  }

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
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
    physics: true
  };

  const handleAddEdge = () => {
    if (selectedNode !== null && secondSelectedNode !== null) {
      setEdges([...edges, {from: selectedNode+"", to: secondSelectedNode+""}]);
      dispatch(createEdge({projectid: window.localStorage.getItem("projectid"), taskid: selectedNode, edgefrom: selectedNode, edgeto: secondSelectedNode}))
      setSelectedNode(null);
      setSecondSelectedNode(null);
    }
  }
  const selectNode = (event) => {
    var node = event.nodes[0]
    
    if (selectedNode === null) {
      setSelectedNode(node)
      console.log(node + "   " + selectedNode)
    } else if(secondSelectedNode === null){
      setSecondSelectedNode(node)
      console.log(node + "   " + selectedNode)
    }
    console.log(selectedNode + "  to  " + secondSelectedNode)
  }

  const events = {
    selectNode,
  };
  
    if(show) { 
        return(
            <>
              <div>
                  <Graph 
                    graph={graph} 
                    options={options} 
                    events = {events}
                    style={{ height: "800px", width: "95wv" }} 
                  />
                  <div>
                    <button onClick={handleAddEdge}>Добавить ребро</button>
                  </div>
              </div>
            </>
        ) 
    }
}
