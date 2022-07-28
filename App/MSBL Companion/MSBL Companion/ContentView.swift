//
//  ContentView.swift
//  MSBL Companion
//
//  Created by Nick Hale on 6/21/22.
//

import SwiftUI
import CoreData

class AppViewModel: ObservableObject{
    

}

struct Roster{
    var Bowser = Player(name:"Bowser",stats: [5,4,6,2,7])
    
    var Peach = Player (name: "Peach", stats: [5,3,7,3,2])
    
    
}

class Player: ObservableObject{
    var Name: String
    var Stats: Array<Int>
    init(name: String, stats: Array<Int>){
        self.Name=name
        self.Stats=stats
    }
    
}

struct ContentView: View {
    

    var body: some View {
        NavigationView{
            MainView()
        }
       
    }
}

struct MainView: View{
    var roster = Roster()
    @State var myChar = ""
    @State var str = 0
    @State var spd = 0
    @State var sht = 0
    @State var pas = 0
    @State var tch = 0
    
    func updateChar(character: Player){
        myChar = character.Name
        str = character.Stats[0]
        spd = character.Stats[1]
        sht = character.Stats[2]
        pas = character.Stats[3]
        tch = character.Stats[4]
    }
    
    
    
    var body: some View{
        VStack{
            Text("Your Character is: " + myChar).padding()
            Text("Stats are: \(str)/\(spd)/\(sht)").padding()
            Button(action: {
                updateChar(character: roster.Peach)
            }, label: {
                Text("beans")
            }).padding().background(Color.blue).foregroundColor(Color.white)
        }
    }
}

struct ttestView: View {
    
    @State var email = ""
    var body: some View{
        VStack {
            TextField("Email Address", text:$email)
                .disableAutocorrection(true)
        }
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView().environment(\.managedObjectContext, PersistenceController.preview.container.viewContext)
    }
}
