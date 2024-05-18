import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css'; // Importar el archivo CSS con los estilos

function App() {
  const [todoList, setTodoList] = useState([]);
  const [name, setName] = useState('');
  const [filterState, setFilterState] = useState('ALL'); // Estado inicial: Mostrar todas las tareas

  const guardar = () => {
    setTodoList(list => [...list, { name: name, state: 'TODO' }]);
    setName(''); // Resetear el input a una cadena vacía
  };

  const eliminarTarea = (index) => {
    setTodoList(todoList.filter((item, i) => i !== index));
  };

  const completarTarea = (index) => {
    const updatedList = todoList.map((item, i) => {
      if (i === index) {
        return { ...item, state: 'DONE' }; // Cambiar el estado de la tarea a 'DONE'
      }
      return item;
    });
    setTodoList(updatedList);
  };

  const cambiarEstado = (index, newState) => {
    const updatedList = todoList.map((item, i) => {
      if (i === index) {
        return { ...item, state: newState }; // Cambiar el estado de la tarea
      }
      return item;
    });
    setTodoList(updatedList);
  };

  const filtrarPorEstado = (estado) => {
    if (estado === 'ALL') {
      return todoList; // Mostrar todas las tareas
    } else {
      return todoList.filter(item => item.state === estado); // Filtrar por estado
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setTodoList(items);
  };

  const getColorByState = (state) => {
    switch (state) {
      case 'TODO':
        return '#ffeb3b'; // Amarillo para 'TODO'
      case 'DOING':
        return '#03a9f4'; // Azul para 'DOING'
      case 'DONE':
        return '#4caf50'; // Verde para 'DONE'
      default:
        return '#ffffff'; // Blanco para cualquier otro caso
    }
  };

  return (
    <Box className="container" sx={{ p: 4 }}> {/* Aplicar la clase "container" */}
      <TableContainer component={Paper} sx={{ mb: 4, width: '100%' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  label="Nombre de la tarea"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={guardar}
                  startIcon={<HourglassEmptyIcon />}
                  fullWidth
                >
                  Guardar
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ flexWrap: 'wrap' }}>
                  <Button variant="outlined" onClick={() => setFilterState('ALL')} startIcon={<HourglassEmptyIcon />}>
                    Mostrar todas
                  </Button>
                  <Button variant="outlined" onClick={() => setFilterState('TODO')} startIcon={<HourglassEmptyIcon />}>
                    Pendientes
                  </Button>
                  <Button variant="outlined" onClick={() => setFilterState('DOING')} startIcon={<HourglassEmptyIcon />}>
                    En progreso
                  </Button>
                  <Button variant="outlined" onClick={() => setFilterState('DONE')} startIcon={<CheckCircleIcon />}>
                    Completadas
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
       <div className="container table-responsive">
        
      
         <div className="task-container"> {/* Aplicar la clase "task-container" */}
        <h2 className="mt-4">Tareas:</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todolist">
            {(provided) => (
              <TableContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
                component={Paper}
              >
                <Table className=' table-responsive-sm'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre de la Tarea</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filtrarPorEstado(filterState).map((item, index) => (
                      <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ backgroundColor: getColorByState(item.state) }} // Aplicar color basado en el estado
                          >
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              {item.state === 'TODO' && <HourglassEmptyIcon />}
                              {item.state === 'DOING' && 'En Progreso'}
                              {item.state === 'DONE' && <CheckCircleIcon />}
                            </TableCell>
                            <TableCell>
                              {(item.state === 'TODO' || item.state === 'DOING') && (
                                <Button variant="contained" color="success" onClick={() => completarTarea(index)} startIcon={<CheckCircleIcon />} sx={{ mb: 1 }}>Completar</Button>
                              )}
                              <Button variant="contained" color="info" onClick={() => cambiarEstado(index, 'DOING')} startIcon={<HourglassEmptyIcon />} sx={{ mb: 1 }}>En Progreso</Button>
                              <Button variant="contained" color="error" onClick={() => eliminarTarea(index)} startIcon={<DeleteIcon />} sx={{ mb: 1 }}>Eliminar</Button>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      </div>
    </Box>
  );
}

export default App;
