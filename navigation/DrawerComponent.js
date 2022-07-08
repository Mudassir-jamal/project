import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Drawer } from 'react-native-paper'

const DrawerComponent = () => {
    const [active, setActive] = useState('');
    return (
        <Drawer.Section title="Some title">
            <Drawer.Item
                label="First Item"
                active={active === 'first'}
                onPress={() => setActive('first')}
            />
            <Drawer.Item
                label="Second Item"
                active={active === 'second'}
                onPress={() => setActive('second')}
            />
        </Drawer.Section>
    )
}

export default DrawerComponent

const styles = StyleSheet.create({})