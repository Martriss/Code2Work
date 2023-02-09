class Crop {
  String id;
  final String name;
  final String description;
  final String image;
  final int priceSeed;
  final int priceCrop;
  final int growTime;
  final int season;

  Crop({
    this.id = '',
    required this.name,
    required this.description,
    required this.image,
    required this.priceSeed,
    required this.priceCrop,
    required this.growTime,
    required this.season,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'description': description,
    'image': image,
    'priceSeed': priceSeed,
    'priceCrop': priceCrop,
    'growTime': growTime,
    'season': season,
  };

  static Crop fromJson(Map<String, dynamic> json) => Crop(
    id: json['id'],
    name: json['name'],
    description: json['description'],
    image: json['image'],
    priceSeed: json['priceSeed'],
    priceCrop: json['priceCrop'],
    growTime: json['growTime'],
    season: json['season'],
  );
}