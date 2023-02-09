import 'package:appli/models/crop.dart';
import 'package:appli/widgets/crop_edit.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class ListCrops extends StatefulWidget {
  final int season;
  final Color currentColor;
  const ListCrops({Key? key, required this.season, required this.currentColor})
      : super(key: key);

  @override
  State<ListCrops> createState() => _ListCropsState();
}

class _ListCropsState extends State<ListCrops> {
  @override
  Widget build(BuildContext context) => Scaffold(
        body: StreamBuilder<List<Crop>>(
            stream: getCrops(),
            builder: (context, snapshot) {
              if (snapshot.hasError) {
                return Text('Something went wrong! ${snapshot.error}');
              } else if (snapshot.hasData) {
                final crops = snapshot.data!
                    .where((crop) => crop.season == widget.season);
                return ListView(
                  children: crops.map(buildCrop).toList(),
                );
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            }),
      );

  Widget buildCrop(Crop crop) => Container(
        padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
        width: double.maxFinite,
        child: Card(
          child: Column(
            children: [
              Container(
                decoration: BoxDecoration(
                  border: Border(
                    top: BorderSide(width: 2.0, color: widget.currentColor),
                  ),
                ),
              ),
              ListTile(
                leading: Image.network(crop.image),
                title: Text(crop.name),
                subtitle: Text(
                  'Grows in ${crop.growTime} days',
                  style: TextStyle(color: Colors.black.withOpacity(0.6)),
                ),
                trailing: Text('${crop.priceSeed}po'),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  crop.description,
                  style: TextStyle(color: Colors.black.withOpacity(0.6)),
                ),
              ),
              Row(children: [
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () {
                    Navigator.of(context).push(
                        MaterialPageRoute(builder: (BuildContext context) {
                      return EditCrop(crop: crop);
                    }));
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () {
                    FirebaseFirestore.instance
                        .collection('crops')
                        .doc(crop.id)
                        .delete();
                  },
                ),
              ])
            ],
          ),
        ),
      );

  Stream<List<Crop>> getCrops() => FirebaseFirestore.instance
      .collection('crops')
      .snapshots()
      .map((snapshot) =>
          snapshot.docs.map((doc) => Crop.fromJson(doc.data())).toList());
}
