import 'package:appli/models/crop.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class CreateCrop extends StatefulWidget {
  const CreateCrop({super.key});

  @override
  State<CreateCrop> createState() => _CreateCropState();
}

class _CreateCropState extends State<CreateCrop> {
  final controllerName = TextEditingController();
  final controllerDescription = TextEditingController();
  final controllerImage = TextEditingController();
  final controllerPriceSeed = TextEditingController();
  final controllerPriceCrop = TextEditingController();
  final controllerGrowTime = TextEditingController();
  int _dropdownValue = 0;
  // final controllerSeason = TextEditingController();

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: const Text('Add Crop'),
        ),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: <Widget>[
            TextField(
              controller: controllerName,
              decoration: decoration('Name'),
            ),
            const SizedBox(height: 24),
            TextField(
              controller: controllerDescription,
              decoration: decoration('Description'),
            ),
            const SizedBox(height: 24),
            TextField(
              controller: controllerImage,
              decoration: decoration('Image'),
            ),
            const SizedBox(height: 24),
            TextField(
              controller: controllerPriceSeed,
              decoration: decoration('Seed Price'),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 24),
            TextField(
              controller: controllerPriceCrop,
              decoration: decoration('Crop Price'),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 24),
            TextField(
              controller: controllerGrowTime,
              decoration: decoration('Grow Time'),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 24),
            DropdownButton(
              hint: const Text('Season'),
              items: const [
                DropdownMenuItem(value: 0, child: Text('Spring')),
                DropdownMenuItem(value: 1, child: Text('Summer')),
                DropdownMenuItem(value: 2, child: Text('Fall')),
                DropdownMenuItem(value: 3, child: Text('Winter')),
              ],
              value: _dropdownValue,
              onChanged: dropdownCallback,
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                final crop = Crop(
                  name: controllerName.text,
                  description: controllerDescription.text,
                  image: controllerImage.text,
                  priceSeed: int.parse(controllerPriceSeed.text),
                  priceCrop: int.parse(controllerPriceCrop.text),
                  growTime: int.parse(controllerGrowTime.text),
                  season: _dropdownValue,
                );

                createCrop(crop);

                Navigator.pop(context);
              },
              child: const Text('Add'),
            ),
          ],
        ),
      );

  InputDecoration decoration(String label) => InputDecoration(
        labelText: label,
        border: const OutlineInputBorder(),
      );

  Future createCrop(Crop crop) async {
    final docCrop = FirebaseFirestore.instance.collection('crops').doc();
    crop.id = docCrop.id;

    final json = crop.toJson();
    await docCrop.set(json);
  }

  void dropdownCallback(int? selectedValue) {
    if (selectedValue is int) {
      setState(() {
        _dropdownValue = selectedValue;
      });
    }
  }
}
