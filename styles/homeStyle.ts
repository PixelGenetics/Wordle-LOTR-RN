import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingTop: 80, // Anclaje superior fijo
        alignItems: 'center',
        backgroundColor: '#1a202c'
    },
    label: { color: '#a0aec0', fontSize: 14, marginBottom: 5 },
    wordDisplay: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    gridContainer: { 
        flexDirection: 'row', 
        gap: 6,
        height: 60, // Altura reservada fija
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    box: {
        width: 45,
        height: 45,
        borderWidth: 2,
        borderColor: '#4a5568',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    boxText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
    input: { 
        width: '80%', 
        height: 55, 
        backgroundColor: '#2d3748',
        color: '#ffffff',
        paddingHorizontal: 15,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10
    },
    messageContainer: { 
        height: 40, // Altura reservada fija
        justifyContent: 'center' 
    },
    messageText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
    hintContainer: {
        height: 120, // ESPACIO FIJO: Suficiente para varias líneas de pista
        width: '90%',
        justifyContent: 'center', // Centra el texto verticalmente en este bloque
        alignItems: 'center',
        marginBottom: 10, // Espacio fijo entre pistas y botón
    },
    hint: { 
        color: '#a0aec0', 
        fontStyle: 'italic', 
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 20, // Asegura legibilidad,
        marginEnd:50,
        marginStart:50
    },
    refreshButton: { 
        marginTop: 'auto', // Opcional: Empuja el botón al fondo si quieres
        marginBottom: 90,
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: '#4a5568', 
        borderRadius: 5 
    }
});