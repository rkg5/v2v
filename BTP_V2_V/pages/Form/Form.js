import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// ...

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([{ id: 1, type: 'text', value: '', choices: [] }]);

  const addFormField = () => {
    const newField = {
      id: formFields.length + 1,
      type: 'text',
      value: '',
      choices: [],
    };
    setFormFields([...formFields, newField]);
  };

  const removeFormField = (id) => {
    const updatedFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFields);
  };

  const handleInputChange = (text, id) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, value: text } : field
    );
    setFormFields(updatedFields);
  };

  const handleFieldTypeChange = (type, id) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, type, choices: [] } : field
    );
    setFormFields(updatedFields);
  };

  const addChoice = (id, choice) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, choices: [...field.choices, choice] } : field
    );
    setFormFields(updatedFields);
  };

  const removeChoice = (id, choiceIndex) => {
    const updatedFields = formFields.map((field) =>
      field.id === id
        ? { ...field, choices: field.choices.filter((_, index) => index !== choiceIndex) }
        : field
    );
    setFormFields(updatedFields);
  };

  const renderFieldOptions = (field) => {
    if (field.type === 'text') {
      return null; // No additional options for text fields
    } else if (field.type === 'checkbox' || field.type === 'multipleChoice') {
      return (
        <View>
          <Text style={{ marginTop: 10, marginBottom: 5 }}>Options:</Text>
          {field.choices.map((choice, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Text>{`${index + 1}. ${choice}`}</Text>
              <TouchableOpacity onPress={() => removeChoice(field.id, index)}>
                <Text style={{ color: 'red', fontSize: 16, marginLeft: 5 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TextInput
            placeholder="Add option"
            style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            value={field.newChoice || ''}
            onChangeText={(text) => setFormFields((prevFields) => prevFields.map((f) => (f.id === field.id ? { ...f, newChoice: text } : f)))}
          />
          <TouchableOpacity onPress={() => addChoice(field.id, field.newChoice)} style={{ padding: 10, backgroundColor: 'lightblue', alignItems: 'center', borderRadius: 5 }}>
            <Text style={{ fontSize: 16 }}>Add Option</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  const handleSubmit = () => {
    // Handle form submission here, you can access formFields state to get all the values.
    console.log('Form Submitted:', formFields);
    // Add your submission logic here
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        {formFields.map((field) => (
          <View key={field.id} style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ marginRight: 10 }}>Field Type:</Text>
              <TouchableOpacity onPress={() => handleFieldTypeChange('text', field.id)} style={{ marginRight: 10 }}>
                <Text style={{ color: field.type === 'text' ? 'blue' : 'black' }}>Text</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFieldTypeChange('checkbox', field.id)} style={{ marginRight: 10 }}>
                <Text style={{ color: field.type === 'checkbox' ? 'blue' : 'black' }}>Checkbox</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFieldTypeChange('multipleChoice', field.id)}>
                <Text style={{ color: field.type === 'multipleChoice' ? 'blue' : 'black' }}>Multiple Choice</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeFormField(field.id)}>
                <Text style={{ color: 'red', fontSize: 16, marginLeft: 10 }}>Delete</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
              value={field.value}
              onChangeText={(text) => handleInputChange(text, field.id)}
              placeholder={`Field ${field.id}`}
            />
            {renderFieldOptions(field)}
          </View>
        ))}
        <TouchableOpacity onPress={addFormField} style={{ padding: 10, backgroundColor: 'lightblue', alignItems: 'center', borderRadius: 5 }}>
          <Text style={{ fontSize: 16 }}>Add Field</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={{ marginTop: 20, padding: 10, backgroundColor: 'green', alignItems: 'center', borderRadius: 5 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Submit Form</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DynamicForm;
