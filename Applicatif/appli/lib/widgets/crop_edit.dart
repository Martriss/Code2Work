import 'package:appli/models/crop.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class EditCrop extends StatefulWidget {
  final Crop crop;
  const EditCrop({Key? key, required this.crop}) : super(key: key);

  @override
  State<EditCrop> createState() => _EditCropState();
}

class _EditCropState extends State<EditCrop> {
  late final controllerName = TextEditingController(text: widget.crop.name);
  late final controllerDescription = TextEditingController(text: widget.crop.description);
  late final controllerImage = TextEditingController(text: widget.crop.image);
  late final controllerPriceSeed = TextEditingController(text: widget.crop.priceSeed.toString());
  late final controllerPriceCrop = TextEditingController(text: widget.crop.priceCrop.toString());
  late final controllerGrowTime = TextEditingController(text: widget.crop.growTime.toString());
  late int _dropdownValue = widget.crop.season;
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
              onChanged: null,
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                final crop = Crop(
                  id: widget.crop.id,
                  name: controllerName.text,
                  description: controllerDescription.text,
                  image: controllerImage.text,
                  priceSeed: int.parse(controllerPriceSeed.text),
                  priceCrop: int.parse(controllerPriceCrop.text),
                  growTime: int.parse(controllerGrowTime.text),
                  season: _dropdownValue,
                );

                editCrop(crop);

                Navigator.pop(context);
              },
              child: const Text('Update'),
            ),
          ],
        ),
      );

  InputDecoration decoration(String label) => InputDecoration(
        labelText: label,
        border: const OutlineInputBorder(),
      );

  Future editCrop(Crop crop) async {
    final docCrop = FirebaseFirestore.instance.collection('crops').doc(widget.crop.id);


    final json = crop.toJson();
    await docCrop.update(json);
  }

  void dropdownCallback(int? selectedValue) {
    if (selectedValue is int) {
      setState(() {
        _dropdownValue = selectedValue;
      });
    }
  }
}
