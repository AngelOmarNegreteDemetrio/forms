import React, { useState } from 'react';
import {
  View, Text, TextInput, Switch, ScrollView, TouchableOpacity, Pressable, StyleSheet, Linking, Platform
} from 'react-native';
import Slider from '@react-native-community/slider';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

// --- PALETA DE COLORES REFINADA (Más Formal y Minimalista) ---
const COLORS = {
  BACKGROUND_LIGHT: '#F8F8F8',
  CARD_WHITE: '#FFFFFF',
  TEXT_DARK: '#1E293B',
  TEXT_SUBTLE: '#64748B',
  BORDER_LINE: '#E2E8F0',
  PRIMARY_ACCENT: '#0F766E',
};

// =========================================================
// Componentes básicos
// =========================================================

const Checkbox = ({ label, checked, onPress }) => (
  <Pressable style={styles.checkboxContainer} onPress={onPress}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <MaterialIcons name="check" size={16} color={COLORS.CARD_WHITE} />}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </Pressable>
);

const RadioButton = ({ label, selected, onPress }) => (
  <Pressable style={styles.radioContainer} onPress={onPress}>
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </Pressable>
);

const RadioGroup = ({ options, selectedValue, onSelect }) => (
  <View style={styles.radioGroup}>
    {options.map((option) => (
      <RadioButton
        key={option.value}
        label={option.label}
        selected={selectedValue === option.value}
        onPress={() => onSelect(option.value)}
      />
    ))}
  </View>
);

const LinkButton = ({ url, label }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={styles.linkButtonContainer}
    >
      <Ionicons name="link-outline" size={18} color={pressed ? COLORS.PRIMARY_ACCENT : COLORS.TEXT_SUBTLE} />
      <Text style={[styles.linkText, pressed && { color: COLORS.PRIMARY_ACCENT }]}>{label}</Text>
    </Pressable>
  );
};

const Box = ({ children, style }) => <View style={[styles.card, style]}>{children}</View>;
const Heading = ({ children }) => <Text style={styles.cardTitle}>{children}</Text>;
const CheckIcon = () => <MaterialIcons name="check" size={16} color={COLORS.CARD_WHITE} />;

// CheckboxGroup Simulado
const CheckboxGroup = ({ value, onChange, children }) => {
  return (
    <View style={styles.checkboxGroupDemo}>
      {React.Children.map(children, (child) => {
        if (child && child.type === CheckboxDemo) {
          const isChecked = value.includes(child.props.value);
          const onPress = () => {
            const newValue = child.props.value;
            const newValues = isChecked
              ? value.filter(v => v !== newValue)
              : [...value, newValue];
            onChange(newValues);
          };
          return React.cloneElement(child, {
            checked: isChecked,
            onPress: onPress
          });
        }
        return child;
      })}
    </View>
  );
};

// COMPONENTE CORREGIDO (Mantiene el filtro para nodos de texto no válidos)
const CheckboxDemo = ({ children, checked, onPress, style }) => {
  return (
    <Pressable style={[styles.checkboxContainer, styles.checkboxDemoLayout, style]} onPress={onPress}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (child.type === CheckboxIndicator) {
          return React.cloneElement(child, { checked });
        }
        return child;
      }).filter(Boolean)
      }
    </Pressable>
  );
};

// Indicador de Checkbox Simulado
const CheckboxIndicator = ({ checked, children, style }) => (
  <View style={[styles.checkbox, checked && styles.checkboxChecked, styles.checkboxIndicatorDemo, style]}>
    {checked && children}
  </View>
);

const CompraProducto = () => {
  const [formData, setFormData] = useState({
    producto: '',
    monto: '',
    cantidad: 1,
    fecha: '',
    notificaciones: false,
    guardarHistorial: true,
    categoria: 'A',
    metodoPago: 'tarjeta',
    opciones: { giftWrap: false, envioRapido: false, promocion: false },
    comentarios: '',
  });

  const [checkboxValues, setCheckboxValues] = useState(['opcion1']);
  const [isPressed, setIsPressed] = useState(false);

  const toggleOpcion = (opcion) => {
    setFormData({
      ...formData,
      opciones: { ...formData.opciones, [opcion]: !formData.opciones[opcion] }
    });
  };

  const handleCompra = () => {
    const compraInfo = {
      ...formData,
      total: (parseFloat(formData.monto) || 0) * formData.cantidad,
      decision: parseFloat(formData.monto) > 0 ? "Compra realizada" : "No se realizó compra",
    };
    console.log('Resumen de compra:', compraInfo);
    console.log(`[ALERTA] ¡${compraInfo.decision}! Revisa la consola para más detalles.`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>

        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Angel Omar Negrete Demtrio </Text>
          <View style={styles.formControl}>
            <Text style={styles.label}>Producto</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="shopping-cart" size={20} color={COLORS.TEXT_SUBTLE} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre del producto"
                placeholderTextColor={COLORS.BORDER_LINE}
                value={formData.producto}
                onChangeText={(text) => setFormData({ ...formData, producto: text })}
              />
            </View>
          </View>

          <View style={styles.formControl}>
            <Text style={styles.label}>Monto por unidad</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="attach-money" size={20} color={COLORS.TEXT_SUBTLE} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Monto"
                placeholderTextColor={COLORS.BORDER_LINE}
                keyboardType="numeric"
                value={formData.monto}
                onChangeText={(text) => setFormData({ ...formData, monto: text })}
              />
            </View>
          </View>
        </View>

        
        <View style={styles.card}>
          <View style={styles.formControl}>
            <Text style={styles.label}>SLIDER (Cantidad: {formData.cantidad})</Text>
            <Slider
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={formData.cantidad}
              minimumTrackTintColor={COLORS.PRIMARY_ACCENT}
              maximumTrackTintColor={COLORS.BORDER_LINE}
              thumbTintColor={COLORS.PRIMARY_ACCENT}
              onValueChange={(val) => setFormData({ ...formData, cantidad: val })}
            />
          </View>

          <View style={styles.formControl}>
            <Text style={styles.label}>FECHA</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="date-range" size={20} color={COLORS.TEXT_SUBTLE} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={COLORS.BORDER_LINE}
                value={formData.fecha}
                onChangeText={(text) => setFormData({ ...formData, fecha: text })}
              />
            </View>
          </View>
        </View>

        
        <View style={styles.card}>
          <View style={styles.formControl}>
            <Text style={styles.label}>SELECT</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="category" size={20} color={COLORS.TEXT_SUBTLE} style={styles.inputIcon} />
              <Picker
                selectedValue={formData.categoria}
                style={styles.picker}
                onValueChange={(itemValue) => setFormData({ ...formData, categoria: itemValue })}
              >
                <Picker.Item label="Opcion A" value="A" />
                <Picker.Item label="Opcion B" value="B" />
                <Picker.Item label="Opcion C" value="C" />
              </Picker>
            </View>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>RADIO</Text>
            <RadioGroup
              options={[
                { label: 'Radio 1', value: 'Radio 1' },
                { label: 'Radio 2', value: 'Radio 2' },
                { label: 'Radio 3', value: 'Radio 3' },
              ]}
              selectedValue={formData.metodoPago}
              onSelect={(val) => setFormData({ ...formData, metodoPago: val })}
            />
          </View>
        </View>

        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>SWITCH</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.optionText}>Recibir opcion 1 </Text>
            <Switch
              value={formData.notificaciones}
              onValueChange={(val) => setFormData({ ...formData, notificaciones: val })}
              trackColor={{ false: COLORS.BORDER_LINE, true: COLORS.PRIMARY_ACCENT }}
              thumbColor={COLORS.CARD_WHITE}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.optionText}>Recibir opcion 2 </Text>
            <Switch
              value={formData.guardarHistorial}
              onValueChange={(val) => setFormData({ ...formData, guardarHistorial: val })}
              trackColor={{ false: COLORS.BORDER_LINE, true: COLORS.PRIMARY_ACCENT }}
              thumbColor={COLORS.CARD_WHITE}
            />
          </View>
        </View>

        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>CHECKBOX</Text>
          {Object.keys(formData.opciones).map((opcion) => (
            <Checkbox
              key={opcion}
              label={opcion.charAt(0).toUpperCase() + opcion.slice(1).replace(/([A-Z])/g, ' $1')}
              checked={formData.opciones[opcion]}
              onPress={() => toggleOpcion(opcion)}
            />
          ))}
        </View>


        <Box style={styles.card}> 
          <Heading> CHECK BOX GROUP</Heading>
          <CheckboxGroup value={checkboxValues} onChange={setCheckboxValues}>

            <CheckboxDemo value="opcion1" aria-label="Checkbox 1" style={styles.checkboxGroupItem}>
              <CheckboxIndicator style={{ marginRight: 12 }}>
                <CheckIcon />
              </CheckboxIndicator>
              <View>
                <Text style={styles.checkboxLabelDemo}>Opcion uno</Text>

              </View>
            </CheckboxDemo>

            <CheckboxDemo value="opcion2" aria-label="Checkbox 2" style={styles.checkboxGroupItem}>
              <CheckboxIndicator style={{ marginRight: 12 }}>
                <CheckIcon />
              </CheckboxIndicator>
              <Text style={styles.checkboxLabelDemo}>Opción dos</Text>
            </CheckboxDemo>

            <CheckboxDemo value="opcion3" aria-label="Checkbox 3" style={styles.checkboxGroupItem}>
              <CheckboxIndicator style={{ marginRight: 12 }}>
                <CheckIcon />
              </CheckboxIndicator>
              <Text style={styles.checkboxLabelDemo}>Opción tres</Text>
            </CheckboxDemo>

          </CheckboxGroup>

        </Box>

        
        <View style={styles.card}>
          <View style={styles.formControl}>
            <Text style={styles.label}>TEXT AREA</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Escribe instrucciones especiales..."
              placeholderTextColor={COLORS.BORDER_LINE}
              multiline
              numberOfLines={4}
              value={formData.comentarios}
              onChangeText={(text) => setFormData({ ...formData, comentarios: text })}
            />
          </View>

          <View style={styles.formControl}>
            <Text style={styles.label}>LINK</Text>
            <LinkButton url="https://www.youtube.com/watch?v=lLSu0UHNZhU&t=3s" label="Ver Términos y Condiciones" />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>PRESABLE</Text>
          <Pressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={styles.pressableDemoContainer}
          ><Text style={[
              styles.pressableDemoText,
              { color: isPressed ? COLORS.PRIMARY_ACCENT : COLORS.TEXT_DARK }
            ]}>
              ⮕ HAZ CLIC AQUÍ
            </Text></Pressable>
        </View>

        
        <TouchableOpacity style={styles.submitButton} onPress={handleCompra}>
          <Text style={styles.submitButtonText}>CONFIRMAR COMPRA</Text>
        </TouchableOpacity>
        
        <View style={{height: 40}} /> 
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND_LIGHT },
  formContainer: { paddingHorizontal: 20, paddingVertical: 20 },

  // Estilo de Tarjeta
  card: {
    backgroundColor: COLORS.CARD_WHITE,
    borderRadius: 8,
    padding: 20,
    marginBottom: 18, 
    borderWidth: 1,
    borderColor: COLORS.BORDER_LINE,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.TEXT_DARK,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LINE,
    paddingBottom: 10
  },

  formControl: { marginBottom: 20 }, 
  label: { fontSize: 13, fontWeight: '500', color: COLORS.TEXT_SUBTLE, marginBottom: 8, textTransform: 'uppercase' }, 

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.CARD_WHITE,
    borderRadius: 8,
    paddingHorizontal: 16, 
    borderWidth: 1,
    borderColor: COLORS.BORDER_LINE,
    height: 48 
  },
  inputIcon: { marginRight: 12 }, 
  input: { flex: 1, height: '100%', color: COLORS.TEXT_DARK, fontSize: 15 },

  picker: { flex: 1, height: 48, color: COLORS.TEXT_DARK },

  // --- Controles de Opción y Switch ---
  optionText: { color: COLORS.TEXT_DARK, fontSize: 15 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8, paddingHorizontal: 5 },

  // Checkbox Estándar y Radio
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  checkbox: { width: 18, height: 18, borderWidth: 1.5, borderColor: COLORS.TEXT_SUBTLE, borderRadius: 3, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  checkboxChecked: { backgroundColor: COLORS.PRIMARY_ACCENT, borderColor: COLORS.PRIMARY_ACCENT },
  checkboxLabel: { fontSize: 15, color: COLORS.TEXT_DARK }, 

  radioGroup: { flexDirection: 'column', paddingLeft: 5 },
  radioContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  radioOuter: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: COLORS.TEXT_SUBTLE, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  radioOuterSelected: { borderColor: COLORS.PRIMARY_ACCENT },
  radioInner: { width: 9, height: 9, borderRadius: 4.5, backgroundColor: COLORS.PRIMARY_ACCENT },
  radioLabel: { fontSize: 15, color: COLORS.TEXT_DARK },

  // Text Area
  textArea: {
    ...Platform.select({
        ios: { minHeight: 120 },
        android: { height: 120 },
    }),
    backgroundColor: COLORS.CARD_WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LINE,
    padding: 15,
    textAlignVertical: 'top',
    color: COLORS.TEXT_DARK,
    fontSize: 15,
  },

  // Link Button
  linkButtonContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingVertical: 5 },
  linkText: { color: COLORS.PRIMARY_ACCENT, marginLeft: 8, fontSize: 15, textDecorationLine: 'underline', fontWeight: '500' },

  // Pressable Demo
  pressableDemoContainer: {
    marginTop: 8,
    paddingVertical: 8,
  },
  pressableDemoText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.TEXT_DARK
  },

  // Botón de Confirmación Formal
  submitButton: {
    backgroundColor: COLORS.TEXT_DARK,
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30, 
    minHeight: 52
  },
  submitButtonText: { color: COLORS.CARD_WHITE, fontSize: 16, fontWeight: '700' },

  // ESTILOS DEMO CHECKBOX GROUP
  checkboxGroupDemo: {
    flexDirection: 'column',
    marginTop: 10
  },
  checkboxDemoLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  checkboxGroupItem: {
    marginTop: 8,
    marginBottom: 8,
    paddingVertical: 4,
  },
  checkboxIndicatorDemo: {
    marginRight: 12, 
  },
  checkboxLabelDemo: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.TEXT_DARK
  }
});

export default CompraProducto;