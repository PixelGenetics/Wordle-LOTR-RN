import { useEffect, useState } from "react";
import { Dimensions, Pressable, Text, TextInput, View } from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon';
import { dictionary, wordItem } from "../../Dictionary/dictionary";
import { styles } from "../../styles/homeStyle";

// Constantes de colores según el diseño
const COLOR_DEFAULT = '#2d3748'; // Gris oscuro para cajas vacías
const COLOR_CORRECT = '#60ce4a'; // Verde
const COLOR_PRESENT = '#e5ff00'; // Amarillo
const COLOR_ABSENT = '#4a5568';  // Gris para letras no encontradas

const Home = () => { 
    const [random, setRandom] = useState<wordItem | null>(null);
    const [char, setChar] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [colors, setColors] = useState<string[]>([]);
    const [refresh, setRefresh] = useState(0);
    const [counter, setCounter] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const {width} = Dimensions.get("window")

    const tamanio = random?.nombre.length || 0;

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * dictionary.length);
        setRandom(dictionary[randomIndex]);
        setChar(''); // Limpiar al refrescar
        setColors([]);
        setMensaje('');
        setCounter(0);
        setShowConfetti(false);
    }, [refresh]);

    const validarIntento = () => {
        if (!random?.nombre || char.length !== tamanio) return;
        
        const secret = random.nombre.toUpperCase().split('');
        const tryWord = char.toUpperCase().split('');
        const newColors = new Array(tamanio).fill(COLOR_ABSENT);
        const secretRemaining: (string | null)[] = [...secret];
        const isCorrect = char.toUpperCase() === random.nombre.toUpperCase();

        tryWord.forEach((character, i) => {
            if(character === secret[i]){
                newColors[i] = COLOR_CORRECT;
                secretRemaining[i] = null;
            }
        });

        tryWord.forEach((character, i) => {
            if(newColors[i] === COLOR_ABSENT){
                const index = secretRemaining.indexOf(character);
                if(index !== -1){
                    newColors[i] = COLOR_PRESENT;
                    secretRemaining[index] = null;
                }
            }
        });
        console.log('counter',char);
        setCounter(counter+1);
        setColors(newColors);
        setMensaje( isCorrect ? 'correcto' : 'incorrecto');
            if(isCorrect){
            setShowConfetti(true);
        }

    };


    return (
        <View style={styles.container}>
            <Text style={styles.wordDisplay}>WORD QUEST</Text>

            <View style={styles.gridContainer}>
                {Array.from({ length: tamanio }).map((_, index) => (
                    <View 
                        key={index}
                        style={[
                            styles.box, 
                            { backgroundColor: colors[index] || COLOR_DEFAULT }
                        ]}
                    >
                        <Text style={styles.boxText}>
                            {char[index]?.toUpperCase() || ''}
                        </Text>
                    </View>
                ))}
            </View>

            <TextInput
                style={styles.input}
                maxLength={tamanio}
                value={char}
                onChangeText={(text) => setChar(text.replace(/[^A-Za-z]/g, '').toUpperCase())}
                onSubmitEditing={validarIntento}
                placeholder="Escribe la palabra..."
                placeholderTextColor="#718096"
                autoCapitalize="characters"
            />

            <View style={styles.messageContainer}>
                {mensaje !== '' && (
                    <Text style={[styles.messageText, { color: mensaje === 'correcto' ? COLOR_CORRECT : '#f56565' }]}>
                        {mensaje === 'correcto' 
                        ? '¡Excelente!' : 'Intenta de nuevo'}
                    </Text>
                )}

            </View>

            <Text style={styles.hint}>Pista 1: {random?.explicacion}</Text>
            <Text style={styles.hint}>Pista 2: {random?.explicacion2}</Text>

            <Pressable style={styles.acceptButton} onPress={validarIntento}>
                <Text style={styles.acceptButtonText}>
                    Aceptar
                </Text>
            </Pressable>

            {counter >= 3 && !showAnswer &&(
            <Pressable style={styles.answerButton} onPress={() => setShowAnswer(true)}>
                <Text style={styles.answerButtonText}>Presiona aqui para ver la respuesta</Text>
            </Pressable>
            )}

            {showAnswer && (
                <Text style={styles.answerText}> {random?.nombre} </Text>
            )}

            <Pressable style={styles.refreshButton} onPress={() => setRefresh(prev => prev + 1)}>
                <Text style={{color: 'white'}}>Nueva Palabra</Text>
            </Pressable>
                {showConfetti && (
                <ConfettiCannon
                count={120}
                origin={{ x: width / 2, y: 80 }}
                fadeOut={true}
                autoStart={true}
                onAnimationEnd={() => setShowConfetti(false)}
                />
                )}
        </View>
    );
};

export default Home;