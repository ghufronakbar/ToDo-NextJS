import { withAuth } from "@/lib/authorization"
import axiosInstance from "@/lib/axiosInstance";
import formatDate from "@/lib/formatDate";
import formatTime from "@/lib/formatTime";
import {
    Table, TableContainer, Td, Th, Tr, Thead, Tbody, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    useToast,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"

const ToDo = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [todo, setTodo] = useState("")
    const [idTodo, setIdTodo] = useState(0)
    const toast = useToast()
    const { data, refetch } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const response = await axiosInstance.get(`/todos`);
            return response.data
        },
    });

    const handleAdd = async () => {
        try {
            const response = await axiosInstance.post(`/todos`, { todo })
            refetch()
            toast({
                title: response.data.message,
                status: 'success',
                isClosable: true,
            })
            setIsOpen(false)
            setTodo("")
        } catch (error) {
            console.log(error)
            toast({
                title: error.response.data.message,
                status: 'error',
                isClosable: true,
            })
        }
    }

    const handleEdit = async (id_todo) => {
        try {
            const response = await axiosInstance.put(`/todos/${id_todo}`, { todo })
            refetch()
            toast({
                title: response.data.message,
                status: 'success',
                isClosable: true,
            })
            setIsOpen(false)
            setTodo("")
        } catch (error) {
            console.log(error)
            toast({
                title: error.response.data.message,
                status: 'error',
                isClosable: true,
            })
        }
    }
    const handleDelete = async (id_todo) => {
        try {
            const response = await axiosInstance.delete(`/todos/${id_todo}`, { todo })
            refetch()
            toast({
                title: response.data.message,
                status: 'info',
                isClosable: true,
            })
            setIsOpen(false)
            setTodo("")
        } catch (error) {
            console.log(error)
            toast({
                title: error.response.data.message,
                status: 'error',
                isClosable: true,
            })
        }
    }
    const ModalToDo = () => {
        return (
            <>
                <Modal isOpen={isOpen} onClose={() => { setIsOpen(false); setIdTodo(0); setTodo("")}}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add a New To Do</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                placeholder="Enter your to do"
                                value={todo}
                                onChange={(e) => { setTodo(e.target.value) }}
                            />
                        </ModalBody>

                        <ModalFooter>
                            {idTodo == 0 ?
                                <Button colorScheme="blue" mr={3} onClick={() => { handleAdd() }}>
                                    Add
                                </Button>
                                :
                                <Button colorScheme="blue" mr={3} onClick={() => { handleEdit(idTodo) }}>
                                    Edit
                                </Button>
                            }
                            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    return (
        <>
            <Button colorScheme="blue" mr={3} onClick={() => { setIsOpen(true) }} m={8}>
                Add To Do
            </Button>
            <TableContainer mx={12}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>To Do</Th>
                            <Th>Time</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.rows?.map((item, index) => {
                            return (
                                <Tr key={index + 1}>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.todo}</Td>
                                    <Td>
                                        <Text>
                                            {formatDate(item.datetime)}
                                        </Text>
                                        <Text>
                                            {formatTime(item.datetime)}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Button m={2} colorScheme='blue' onClick={() => { setIsOpen(true); setIdTodo(item.id_todo); setTodo(item.todo) }}>Edit</Button>
                                        <Button m={2} colorScheme='red' onClick={() => { handleDelete(item.id_todo) }}>Edit</Button>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            {ModalToDo()}
        </>
    )
}


export default withAuth(ToDo)