import 'package:appli/widgets/nav.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const String _title = 'Crops';

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: _title,
      home: NavBar(),
    );
  }
}
