import 'package:appli/widgets/crop_create.dart';
import 'package:appli/widgets/crop_list.dart';
import 'package:flutter/material.dart';

class NavBar extends StatefulWidget {
  const NavBar({super.key});

  @override
  State<NavBar> createState() => _NavBarState();
}

class _NavBarState extends State<NavBar> {
  var currentColor = Colors.green;
  final controller = TextEditingController();
  int _selectedIndex = 0;
  late final List<Widget> _widgetOptions = const <Widget>[
    ListCrops(season: 0, currentColor: Colors.green,),
    ListCrops(season: 1, currentColor: Colors.yellow,),
    ListCrops(season: 2, currentColor: Colors.deepOrange,),
    ListCrops(season: 3, currentColor: Colors.lightBlue,),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      if (index == 0) currentColor = Colors.green;
      if (index == 1) currentColor = Colors.yellow;
      if (index == 2) currentColor = Colors.deepOrange;
      if (index == 3) currentColor = Colors.lightBlue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: currentColor,
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              Navigator.of(context)
                  .push(MaterialPageRoute(builder: (BuildContext context) {
                return const CreateCrop();
              }));
            },
          )
        ],
      ),
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.local_florist),
            label: 'Spring',
            backgroundColor: Colors.green,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.sunny),
            label: 'Summer',
            backgroundColor: Colors.yellow,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.energy_savings_leaf),
            label: 'Fall',
            backgroundColor: Colors.deepOrange,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.ac_unit),
            label: 'Winter',
            backgroundColor: Colors.lightBlue,
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.amber[600],
        onTap: _onItemTapped,
      ),
    );
  }
}
