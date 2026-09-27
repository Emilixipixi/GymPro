import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import EncabezadoApp from '../components/EncabezadoApp';
import { useRoutines, gruposMusculares } from '../context/RoutineContext';

export default function ProgressScreen() {
  const { routines, featuredRoutine } = useRoutines();

  const totalRutinas = routines.length;

  const duracionTotal = routines.reduce((suma, rutina) => suma + rutina.duration, 0);

  const duracionPromedio = totalRutinas > 0 ? duracionTotal / totalRutinas : 0;

  const conteoPorGrupo = routines.reduce<Record<string, number>>((conteo, rutina) => {
    conteo[rutina.muscleGroup] = (conteo[rutina.muscleGroup] ?? 0) + 1;
    return conteo;
  }, {});

  let grupoPrincipal = 'Sin datos';
  let cantidadGrupoPrincipal = 0;
  Object.entries(conteoPorGrupo).forEach(([grupo, cantidad]) => {
    if (cantidad > cantidadGrupoPrincipal) {
      grupoPrincipal = grupo;
      cantidadGrupoPrincipal = cantidad;
    }
  });

  return (
    <SafeAreaView style={estilos.contenedor} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={estilos.scroll} showsVerticalScrollIndicator={false}>
        <EncabezadoApp />
        <Text style={estilos.etiquetaSuperior}>RESUMEN DE ENTRENAMIENTO</Text>
        <Text style={estilos.encabezado}>Progreso</Text>

        {totalRutinas === 0 ? (
          <View style={estilos.tarjetaVacia}>
            <Ionicons name="trending-up-outline" size={28} color="#E11D2E" />
            <Text style={estilos.mensaje}>Aún no registras entrenamientos. ¡Empieza tu primera rutina!</Text>
          </View>
        ) : (
          <>
            <Text style={estilos.tituloSeccionInicial}>Rutina destacada</Text>
            {featuredRoutine ? (
              <View style={estilos.tarjetaDestacada}>
                <View style={estilos.iconoDestacada}>
                  <Ionicons name="star" size={26} color="#FACC15" />
                </View>
                <View style={estilos.infoDestacada}>
                  <Text style={estilos.nombreDestacada} numberOfLines={1}>{featuredRoutine.name}</Text>
                  <Text style={estilos.detalleDestacada}>
                    {featuredRoutine.muscleGroup} · {featuredRoutine.duration} min
                  </Text>
                </View>
              </View>
            ) : (
              <View style={estilos.tarjetaSinDestacada}>
                <Ionicons name="star-outline" size={20} color="#666666" />
                <Text style={estilos.textoSinDestacada}>
                  Aún no tienes una rutina destacada. Márcala con la estrella en Rutinas.
                </Text>
              </View>
            )}

            <Text style={estilos.tituloSeccion}>Estadísticas</Text>
            <View style={estilos.cuadricula}>
              <View style={estilos.tarjetaDato}>
                <Ionicons name="list-outline" size={22} color="#E11D2E" />
                <Text style={estilos.valorDato}>{totalRutinas}</Text>
                <Text style={estilos.etiquetaDato}>Total de rutinas</Text>
              </View>

              <View style={estilos.tarjetaDato}>
                <Ionicons name="time-outline" size={22} color="#E11D2E" />
                <Text style={estilos.valorDato}>{Math.round(duracionTotal)}</Text>
                <Text style={estilos.etiquetaDato}>Minutos en total</Text>
              </View>

              <View style={estilos.tarjetaDato}>
                <Ionicons name="speedometer-outline" size={22} color="#E11D2E" />
                <Text style={estilos.valorDato}>{duracionPromedio.toFixed(1)}</Text>
                <Text style={estilos.etiquetaDato}>Minutos promedio</Text>
              </View>

              <View style={estilos.tarjetaDato}>
                <Ionicons name="body-outline" size={22} color="#E11D2E" />
                <Text style={estilos.valorDato} numberOfLines={1}>{grupoPrincipal}</Text>
                <Text style={estilos.etiquetaDato}>
                  Grupo más trabajado ({cantidadGrupoPrincipal})
                </Text>
              </View>
            </View>

            <Text style={estilos.tituloSeccion}>Distribución por grupo</Text>
            <View style={estilos.tarjetaDistribucion}>
              {gruposMusculares.map((grupo) => {
                const cantidad = conteoPorGrupo[grupo] ?? 0;
                const porcentaje = Math.round((cantidad / totalRutinas) * 100);
                return (
                  <View key={grupo} style={estilos.filaGrupo}>
                    <View style={estilos.filaGrupoTexto}>
                      <Text style={estilos.nombreGrupo}>{grupo}</Text>
                      <Text style={estilos.cantidadGrupo}>
                        {cantidad} · {porcentaje}%
                      </Text>
                    </View>
                    <View style={estilos.barraFondo}>
                      <View style={[estilos.barraRelleno, { width: `${porcentaje}%` }]} />
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#0F0F0F', paddingHorizontal: 16, paddingTop: 8 },
  scroll: { paddingBottom: 32 },
  etiquetaSuperior: {
    color: '#E11D2E',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  encabezado: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginTop: 2, marginBottom: 16 },
  tarjetaVacia: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#262626',
    alignItems: 'center',
    gap: 10,
  },
  mensaje: { color: '#9A9A9A', fontSize: 14, textAlign: 'center' },
  tituloSeccionInicial: {
    color: '#9A9A9A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  tarjetaDestacada: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1A12',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.4)',
    gap: 14,
  },
  iconoDestacada: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(250, 204, 21, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoDestacada: { flex: 1 },
  nombreDestacada: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  detalleDestacada: { color: '#FACC15', fontSize: 13, fontWeight: '600', marginTop: 4 },
  tarjetaSinDestacada: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262626',
    borderStyle: 'dashed',
    gap: 10,
  },
  textoSinDestacada: { flex: 1, color: '#9A9A9A', fontSize: 13 },
  cuadricula: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  tarjetaDato: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262626',
    gap: 6,
  },
  valorDato: { color: '#FFFFFF', fontSize: 24, fontWeight: '800' },
  etiquetaDato: { color: '#9A9A9A', fontSize: 12 },
  tituloSeccion: {
    color: '#9A9A9A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 10,
  },
  tarjetaDistribucion: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262626',
    gap: 14,
  },
  filaGrupo: { gap: 6 },
  filaGrupoTexto: { flexDirection: 'row', justifyContent: 'space-between' },
  nombreGrupo: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  cantidadGrupo: { color: '#9A9A9A', fontSize: 13 },
  barraFondo: { height: 8, borderRadius: 4, backgroundColor: '#262626', overflow: 'hidden' },
  barraRelleno: { height: 8, borderRadius: 4, backgroundColor: '#E11D2E' },
});