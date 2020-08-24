import React, { useEffect, useState } from 'react'
import { SafeAreaView,  TouchableOpacity, FlatList, Text, StyleSheet, StatusBar } from 'react-native'

import api from './services/api'

export default function App() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('projects').then(Response => {
            console.log(Response.data)
            setProjects(Response.data)
        })
    }, [])

    async function handleAddProject() {
        const Response = await api.post('projects',{
            title: `NOVOPROJETO ${Date.now()}`,
            owner: 'Filipe Alves'
        })
        const project = Response.data

        setProjects([...projects,project])
    }
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <SafeAreaView style={styles.conteiner}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project} >{project.title}</Text>
                    )}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.buttonAdd}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonAddText}> Adicionar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    title: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
    },
    project: {
        color: '#FFF',
        fontSize: 30,
    },
    buttonAdd: {
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonAddText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})